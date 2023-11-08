const { default: mongoose } = require('mongoose');
const Medicine = require('../Models/medicine');
const Patient = require('../Models/patient');
const Order = require('../Models/Order');
const patient =require('../Models/patient');
const Cart =require('../Models/Cart');
const Pharmacist = require('../Models/pharmacist');
const jwt = require ('jsonwebtoken');
const Admin=require('../Models/administrator');
const Administrator = require('../Models/administrator');
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
//Req 32: choose payment method
const choosePaymentMethod = async(req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const { username } = req.params;
  try{
    
    const patient = await Patient.findOne({Username: username});

    if(!patient){
      return res.status(404).json({error : "This patient doesn't exist!"})
  }

  const order = await Order.findOne({PatientUsername: username});

  if(!order){
    return res.status(404).json({error : "This order doesn't exist yes!"})
}

  const updatedOrder = {
    $set: {
        PaymentMethod: req.body.PaymentMethod
    },
  };

  const updated = await Order.updateOne({PatientUsername: username},updatedOrder);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

const checkoutOrder = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const { username } = req.params;
  try{
    
    const patient = await Patient.findOne({Username: username});

    if(!patient){
      return res.status(404).json({error : "This patient doesn't exist!"})
  }

  const updatedOrder = {
    $set: {
        PaymentMethod: req.body.PaymentMethod
    },
  };

  const updated = await Order.updateOne({PatientUsername: username},updatedOrder);
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
      const order = await Order.findOne({ PatientUsername: Username });

      if (!order) {
          return res.status(404).json({ error: "Order not found for this patient." });
      }

      const orderItems = order.Items;
      let Items = new array(orderItems.length);
      for(const orderItem of orderItems){
        const medicine = await Medicine.findById(orderItem.Medicine);
        Items.push([{MedicineName: medicine.Name, Quantity: orderItem.Quantity}]);
      }

      const orderDetails = {
        Items,
        _id: order._id,
        PaymentMethod: order.PaymentMethod,
        Status: order.Status,
        TotalAmount: order.TotalAmount,
        ShippingAddress: order.ShippingAddress
      }

      res.status(200).json(orderDetails);
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

    const newItem = {
      medicine: MedicineName,
      quantity: 1,
    };

    cart.items.push(newItem);
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

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
    return jwt.sign({ name }, 'supersecret', {
        expiresIn: maxAge
    });
};


const login = async (req, res) => {
  const { Username, password } = req.body;
  try {
    const userpharmacist = await Pharmacist.findOne({ Username: Username });
    const userPatient = await patient.findOne({ Username: Username });
    const userAdmin = await Administrator.findOne({ Username: Username });

    if (userpharmacist && !userPatient&& !userAdmin) {
      //const isPasswordMatch1 = await compare(password, userpharmacist.Password);
          
      if (password===userpharmacist.Password) {
        const token = createToken(userpharmacist.Username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ userpharmacist, token });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else if (!userpharmacist && userPatient&& !userAdmin) {
       
        if (password===userPatient.Password) {
          const token = createToken(userPatient.Username);
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(200).json({ userPatient, token });
        }
        else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    
    else if (!userpharmacist && !userPatient&& userAdmin) {
      if (password===userAdmin.Password) {
          const token = createToken(userAdmin.Username);
          res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
          res.status(200).json({ userAdmin, token });
        } else {
          res.status(401).json({ error: 'Invalid credentials' });
        }
      }
    
    else {
      res.status(401).json({ error: 'User not found' });
    }
  }
   catch (error) {
    res.status(400).json({ error: error.message });
  }
};




const logout = async (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 }); // Clear the JWT cookie to log the user out
  res.status(200).json({ message: 'Logged out successfully' });
}


module.exports = {
  availableMedicinesDetailsByPatient,
  getMedicineByName,
  getMedicineByMedicalUse,
  choosePaymentMethod,
  addAddressToPatient,
  getPatientAddresses ,
  getOrderDetails,
  cancelOrder,
  viewCartItems,
  removeAnItemFromCart,
  addMedicineToCart,
  updateMedicineQuantityInCart,
  login,
  logout
};