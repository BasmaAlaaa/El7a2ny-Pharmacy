const { default: mongoose } = require('mongoose');
const Medicine = require('../Models/medicine');
const Patient = require('../Models/patient');
const Order = require('../Models/Order');
const Cart =require('../Models/Cart');

require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_KEY);

// Task 12: view a list of all available medicines
const availableMedicinesDetailsByPatient = async (req, res) => {
  const medicines = await Medicine.find();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if(!medicines){
      res.status(400).json({error: "There are no available medicines!"})
  }
  res.status(200).json(medicines.map(({Name, ActiveIngredients, Price, Picture}) => ({Name, ActiveIngredients, Price, Picture})));
}

 // Search for medicine by name
 const getMedicineByName = async (req, res) => {
  const {Name} = req.params;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const info = await Medicine.findOne({Name: Name},{ _id: 0, ActiveIngredients: 0, Price: 0, Picture: 0, MedicalUse:0 });
  if(!info){
      return res.status(400).json({error: "This medicine does not exist!"})
  }
  
      res.status(200).json(info);
}

 // Filter medicine by medical use
 const getMedicineByMedicalUse = async (req, res) => {
  const {MedicalUse} = req.params;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const info = await Medicine.findOne({MedicalUse: MedicalUse},{ _id: 0, Name: 0, ActiveIngredients: 0, Price: 0, Picture: 0 });
  if(!info){
      return res.status(400).json({error: "This medicine does not exist!"})
  }
  
      res.status(200).json(info);
}

//Req 29 + 32 : checkhout + payment method + pay
const checkoutOrder = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const { Username , paymentMethod} = req.params;
  try{
    
    //CheckhoutOrder
    const patient = await Patient.findOne({Username: Username});

    if(!patient){
      return res.status(404).json({error : "This patient doesn't exist!"})
  }

  const cart = await Cart.findById(patient.cart);

  if(!cart){
    return res.status(404).json({error : "This Cart doesn't exist!"})
}

  if(cart.items.length === 0){
    return res.status(404).json({error : "Your cart is empty!"})
  }
  
  cartItems = cart.items;

  const newOrder = await Order.create({
    PatientUsername: Username,
    Items: cartItems,
    TotalAmount: cart.totalAmount,

  });

  while(cart.items.length > 0) {
    cart.items.pop();
  };
  cart.totalAmount = 0;
  await cart.save();

  //Choosing payment method

  const orderId = newOrder._id;

  const order = await Order.findById(orderId);

  if (!order) {
    return res.status(404).send({ error: 'Order not found' });
  }

  const updatedOrder = {
    $set: {
        PaymentMethod: req.body.PaymentMethod
    },
  };

  const updated = await Order.findOneAndUpdate({_id: orderId},updatedOrder);

  //Paying The Order

  if(paymentMethod === "card"){

  const paymentIntent = await stripe.paymentIntents.create({
    amount: order.TotalAmount,
    currency: 'egp',
    customer: patient.StripeCustomerId,
    description: "Paying for my order"
  });

  await stripe.paymentIntents.confirm(paymentIntent);
}
else if(paymentMethod === "wallet"){

if(patient.WalletAmount <= order.TotalAmount)
  return res.status(400).send("Your wallet amount won't cover the whole order amount!")

if(patient.WalletAmount >= order.TotalAmount){
  const updatedPat = {
    $set: {
      WalletAmount: (WalletAmount-order.TotalAmount),
    },
  };

  const update = await patientSchema.updateOne({Username: order.PatientUsername},updatedPat);
}
}
  res.status(200).send(order);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }

};

const addAddressToPatient = async (req, res) => {
  const { Username } = req.params;
  const { newAddress } = req.body; 

  try {
   
    const patient = await Patient.findOneAndUpdate(
      { Username: Username },
      { $push: { addresses: newAddress } },
      { new: true } 
    );

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getPatientAddresses = async (req, res) => {
  const { Username } = req.params; 

  try {
    
    const patient = await Patient.findOne({ Username: Username }, 'addresses');

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    
    res.status(200).json(patient.addresses);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const getOrderDetails = async (req, res) => {
  const { Username } = req.params;

  try {
      const orders = await Order.find({ PatientUsername: Username });

      if (orders.length === 0) {
          return res.status(404).json({ error: "No orders for this patient." });
      }

      var result = [];

      for(const order of orders){
        const orderItems = order.Items;
        var Items = [];

        for(const orderItem of orderItems){
          const medicine = await Medicine.findOne({Name: orderItem.medicine});
          Items.push({MedicineName: medicine.Name, Quantity: orderItem.quantity});
        }

        const orderDetails = {
          Items,
          _id: order._id,
          PaymentMethod: order.PaymentMethod,
          Status: order.Status,
          TotalAmount: order.TotalAmount,
          ShippingAddress: order.ShippingAddress
        }

        result.push(orderDetails);
      }

      res.status(200).json(result);
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
      // Update the status of the order to 'Cancelled'
      const order = await Order.findOneAndUpdate(
          { _id: orderId, Status: { $ne: "Cancelled" } }, // This condition ensures that orders that are already cancelled are not updated again.
          { Status: "Cancelled" },
          { new: true } // This option returns the updated document
      );

      if (!order) {
          return res.status(404).json({ error: "Order not found or it has already been cancelled." });
      }

      res.status(200).json({ message: "Order cancelled successfully.", order: order });
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
};

const viewCartItems = async (req, res) => {
  const { Username } = req.params;

  try {
    const patient = await Patient.findOne({ Username });

    if (!patient) {
      return res.status(404).send({ error: 'Patient not found' });
    }

    const cartId = patient.cart;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }

    // Extract items from the cart
    const items = cart.items;

    // Send the items list in the response
    res.status(200).send({ items });
  } catch (error) {
    // Handle any errors, e.g., database errors
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};



// const removeAnItemFromCart = async (req, res) => {
//   const { Username, MedicineName } = req.params;
// const indexToRemove =-1;
//   try {
//     const patient = await Patient.findOne({ Username });

//     if (!patient) {
//       return res.status(404).send({ error: 'Patient not found' });
//     }

//     const cartId = patient.cart;

//     const cart = await Cart.findById(cartId);

//     if (!cart) {
//       return res.status(404).send({ error: 'Cart not found' });
//     }

//     for (let i = 0; i < cart.items.length; i++) {
//       if (cart.items[i].medicine === MedicineName) {
//         indexToRemove = i;
//         break; // Exit the loop when the item is found
//       }
//     }
//     if (indexToRemove === -1) {
//       return res.status(404).send({ error: `Medicine ${MedicineName} not found in the cart` });
//     }
//     const medicine = await Medicine.findOne({ Name: MedicineName });

//     //console.log(indexToRemove);
//     const removedMedicinePrice = medicine.Price * cart.items[indexToRemove].quantity;
//     //console.log(removedMedicinePrice);
//     //console.log(cart.totalAmount);
//     cart.totalAmount = cart.totalAmount - removedMedicinePrice;
//     cart.items.splice(indexToRemove, 1);

//     //console.log('ready to cdelete');
//     await cart.save();

//     res.status(200).send({ message: `Medicine ${MedicineName} removed from the cart` });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: 'Internal server error' });
//   }
// };
const removeAnItemFromCart = async (req, res) => {
  const { Username, MedicineName } = req.params;
  var indexToRemove = -1;
  try {
     const patient = await Patient.findOne({ Username });
 
     if (!patient) {
       return res.status(404).send({ error: 'Patient not found' });
     }
 
     const cartId = patient.cart;
 
     const cart = await Cart.findById(cartId);
 
     if (!cart) {
       return res.status(404).send({ error: 'Cart not found' });
     }
 
     for (let i = 0; i < cart.items.length; i++) {
       if (cart.items[i].medicine === MedicineName) {
         indexToRemove = i;
         break; // Exit the loop when the item is found
       }
     }
 
     if (indexToRemove === -1) {
       return res.status(404).send({ error: `Medicine ${MedicineName} not found in the cart` });
     }
 
     const medicine = await Medicine.findOne({ Name: MedicineName });
 
     const removedMedicinePrice = medicine.Price * cart.items[indexToRemove].quantity;
 
     cart.totalAmount = cart.totalAmount - removedMedicinePrice;
     cart.items.splice(indexToRemove, 1);
 
     await cart.save();
 
     res.status(200).send({ message: `Medicine ${MedicineName} removed from the cart` });
  } catch (error) {
     console.error(error);
     res.status(500).send({ error: 'Internal server error' });
  }
}

const addMedicineToCart = async (req, res) => {
  const { Username, MedicineName } = req.params;
  try {
    const patient = await Patient.findOne({ Username });

    if (!patient) {
      return res.status(404).send({ error: 'Patient not found' });
    }

    const cartId = patient.cart;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }

    const medicine = await Medicine.findOne({ Name: MedicineName });

    if (!medicine) {
      return res.status(404).send({ error: `Medicine ${MedicineName} not found` });
    }

    /*const items = cart.items;
    const found = -1;
    for( const item of items){
      if(found != -1){
        if(item.medicine === MedicineName){
          item.quantity++;
          found = true;
        }
      }
    }*/

    const index = cart.items.findIndex(x => x.medicine === MedicineName);

    if(index === -1){
      const newItem = {
        medicine: MedicineName,
        quantity: 1,
      };
  
      cart.items.push(newItem);
    }
    else{
      (cart.items[index].quantity)++;
    }

    
    cart.totalAmount += medicine.Price;

    await cart.save();

    res.status(200).send({ message: `Medicine ${MedicineName} added to the cart` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};
const updateMedicineQuantityInCart = async (req, res) => {
  const { Username, MedicineName ,quantity} = req.params;
  //const { quantity } = req.body;

  try {
    const patient = await Patient.findOne({ Username });

    if (!patient) {
      return res.status(404).send({ error: 'Patient not found' });
    }

    const cartId = patient.cart;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).send({ error: 'Cart not found' });
    }

    const medicine = await Medicine.findOne({ Name: MedicineName });

    if (!medicine) {
      return res.status(404).send({ error: `Medicine ${MedicineName} not found` });
    }

    const itemToUpdate = cart.items.find(item => item.medicine === MedicineName);

    if (itemToUpdate) {
      const oldQuantity = itemToUpdate.quantity;
      const quantityChange = quantity - oldQuantity;
      itemToUpdate.quantity = quantity;
      cart.totalAmount += quantityChange * medicine.Price;
      await cart.save();
      res.status(200).send({ message: `Quantity of Medicine ${MedicineName} in the cart updated to ${quantity}` });
    } else {
      res.status(404).send({ error: `Medicine ${MedicineName} not found in the cart` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal server error' });
  }
};
module.exports = {
  availableMedicinesDetailsByPatient,
  getMedicineByName,
  getMedicineByMedicalUse,
  addAddressToPatient,
  getPatientAddresses ,
  getOrderDetails,
  cancelOrder,
  viewCartItems,
  removeAnItemFromCart,
  addMedicineToCart,
  updateMedicineQuantityInCart,
  checkoutOrder
};