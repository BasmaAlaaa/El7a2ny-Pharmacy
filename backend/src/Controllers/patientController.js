const { default: mongoose } = require('mongoose');
const Medicine = require('../Models/medicine');
const Patient = require('../Models/patient');
const Order = require('../Models/Order');
const Cart =require('../Models/Cart');
const SReport = require('../Models/SReport');
require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_KEY);

// Task 12: view a list of all available medicines 
// i edited this function in order to make the patient only view unarchived medicines  (megz)
const availableMedicinesDetailsByPatient = async (req, res) => {

  const { Username } = req.params;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!(req.user.Username === Username)) {
      res.status(403).json("You are not logged in!");
  }else{
    try {
      // Only fetching unarchived medicines
      const medicines = await Medicine.find({ Status: 'unarchived' });

      if (!medicines || medicines.length === 0) {
        res.status(400).json({ error: "There are no available medicines!" });
      } else {
        res.status(200).json(medicines.map(({ Name, ActiveIngredients, Price, Picture, MedicalUse, Quantity }) => ({
          Name,
          ActiveIngredients,
          Price,
          Picture,
          MedicalUse,
          Quantity
        })));
      }
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  }
}

 // Search for medicine by name
 const getMedicineByName = async (req, res) => {
  const {Name, Username} = req.params;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!(req.user.Username === Username)) {
      res.status(403).json("You are not logged in!");
  }else{
    try{
      const info = await Medicine.findOne({Name: Name},{ _id: 0, ActiveIngredients: 0, Price: 0, Picture: 0, MedicalUse:0 });
      if(!info){
        return res.status(400).json({error: "This medicine does not exist!"})
      }
      res.status(200).json(info);
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  }
}

 // Filter medicine by medical use
 const getMedicineByMedicalUse = async (req, res) => {
  const {MedicalUse, Username} = req.params;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try{
      const info = await Medicine.findOne({MedicalUse: MedicalUse},{ _id: 0, Name: 0, ActiveIngredients: 0, Price: 0, Picture: 0 });
      if(!info){
          return res.status(400).json({error: "This medicine does not exist!"})
      }
      res.status(200).json(info);
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  }
}

//Req 29 + 32 : checkhout + payment method + pay
const checkoutOrder = async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const { Username , paymentMethod, ShippingAddress} = req.params;
  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
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

    if((paymentMethod === "wallet" && patient.WalletAmount >= cart.totalAmount) || (paymentMethod === "card") || (paymentMethod === "cash")){
      const newOrder = await Order.create({
        PatientUsername: Username,
        Items: cartItems,
        TotalAmount: cart.totalAmount,
    
      });

      const currentMonth = new Date().toLocaleString('default',{month: 'long'});
      let total = 0;
      total+= cart.totalAmount;

      let salesDocument = await SReport.findOne();
      if(!salesDocument)
        salesDocument = new SReport();

      const salesEntry = salesDocument.monthlySales.find(entry => entry.Month === currentMonth);
      if(salesEntry)
        salesEntry.totalSales+=total;
      else{
        salesDocument.monthlySales.push({Month: currentMonth ,totalSales : total});
      }
      const currentDate = new Date();
      const dateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  
      // loop over the cart items and add them to the medicineSales array
      for (const cartItem of cart.items) {
        const medicine = await Medicine.findOne({ Name: cartItem.medicine }); 

          salesDocument.medicineSales.push({
          medicineName: cartItem.medicine,
          date: dateWithoutTime,
          total: cartItem.quantity * medicine.Price,
        });
      }
      await salesDocument.save();
    
      while(cart.items.length > 0) {
        cart.items.pop();
      };
      cart.totalAmount = 0;
      await cart.save();
    
      //Choosing payment method and shipping address
    
      const orderId = newOrder._id;
    
      const order = await Order.findById(orderId);
    
      if (!order) {
        return res.status(404).send({ error: 'Order not found' });
      }
    
      const updatedOrder = {
        $set: {
            PaymentMethod: paymentMethod,
            ShippingAddress: ShippingAddress
        },
      };
    
      const updated = await Order.findOneAndUpdate({_id: orderId},updatedOrder);
      
      if(paymentMethod === "wallet"){
        const updatedPat = {
          $set: {
            WalletAmount: (WalletAmount-order.TotalAmount),
          },
        };
      
        const update = await patientSchema.updateOne({Username: order.PatientUsername},updatedPat);
      }
      res.status(200).send(order);
    }
    else{
      return res.status(400).send("Your wallet amount won't cover the whole order amount!")
    }
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
};

const addAddressToPatient = async (req, res) => {
  const { Username } = req.params;
  const { newAddress } = req.body; 

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
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
  }
};

const getPatientAddresses = async (req, res) => {
  const { Username } = req.params; 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
    try {
      
      const patient = await Patient.findOne({ Username: Username }, 'addresses');

      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }      
      res.status(200).json(patient.addresses);

    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
};

const getOrderDetails = async (req, res) => {
  const { Username } = req.params;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
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
  }
};

const cancelOrder = async (req, res) => {
  const { orderId } = req.params;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  try {

    
    
      // Update the status of the order to 'Cancelled'
      const order = await Order.findOneAndUpdate(
          { _id: orderId, Status: { $ne: "Cancelled" } },
          { Status: "Cancelled" },
          { new: true } // This option returns the updated document
      );

      if (!order) {
          return res.status(404).json({ error: "Order not found or it has already been cancelled." });
      }

      
      

      if (!(req.user.Username === order.PatientUsername)) {
          return res.status(403).json("You are not logged in!");
      }

      // Process refund if the order is not COD
      if (order.PaymentMethod !== 'COD') {
          const patient = await Patient.findOne({ Username: order.PatientUsername });
          if (patient) {
              patient.WalletAmount += order.TotalAmount; // Add the refund amount to the patient's wallet
              await patient.save();
          }
      }

      res.status(200).json({ message: "Order cancelled successfully.", order: order });
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
};


const viewCartItems = async (req, res) => {
  const { Username } = req.params;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{

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
  }
};

const removeAnItemFromCart = async (req, res) => {
  const { Username, MedicineName } = req.params;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{

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

      medicine.QuantitySold -= 1;
      medicine.Quantity += 1;

      await medicine.save();
  
      res.status(200).send({ message: `Medicine ${MedicineName} removed from the cart` });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  }
}

const addMedicineToCart = async (req, res) => {
  const { Username, MedicineName } = req.params;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{
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

      if(medicine.Quantity >= 1){
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

      medicine.QuantitySold += 1;
      medicine.Quantity -= 1;

      await medicine.save();

      res.status(200).send({ message: `Medicine ${MedicineName} added to the cart` });
      }
      else{
        res.status(400).send({ error: `Medicine ${MedicineName} is sold out` });
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  }
};

const updateMedicineQuantityInCart = async (req, res) => {
  const { Username, MedicineName ,quantity} = req.params;
  //const { quantity } = req.body;

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if (!(req.user.Username === Username)) {
    res.status(403).json("You are not logged in!");
  }else{

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
        if(medicine.Quantity >= quantity){
          const oldQuantity = itemToUpdate.quantity;
        const quantityChange = quantity - oldQuantity;
        itemToUpdate.quantity = quantity;
        cart.totalAmount += quantityChange * medicine.Price;
        
        await cart.save();

        medicine.QuantitySold += quantityChange;
        medicine.Quantity -= quantityChange;

        await medicine.save();

        res.status(200).send({ message: `Quantity of Medicine ${MedicineName} in the cart updated to ${quantity}` });
        }
        else{
          res.status(400).send({ error: `The quantity of medicine ${MedicineName} left is not enough` });
        }
      } else {
        res.status(404).send({ error: `Medicine ${MedicineName} not found in the cart` });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Internal server error' });
    }
  }
};

const viewAlternatives = async (req, res) => {
  try {
    const { Username, medicineName } = req.params;
    const requestedMedicine = await Medicine.findOne({ Name: medicineName, Quantity: 0, Status: 'unarchived' });

    if (!requestedMedicine) {
      return res.status(404).json({ message: 'Medicine not found or not out of stock' });
    }

    const alternativeMedicines = await Medicine.find({
      ActiveIngredients: requestedMedicine.ActiveIngredients,
      Quantity: { $gt: 0 }, 
      Status: 'unarchived', 
    });

    if (alternativeMedicines.length === 0) {
      return res.status(404).json({ message: 'No alternative medicines available' });
    }

    res.status(200).json(alternativeMedicines.map(({ Name, ActiveIngredients, Price, Picture, MedicalUse, Quantity }) => ({
      Name,
      ActiveIngredients,
      Price,
      Picture,
      MedicalUse,
      Quantity
    })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const getAllOrders = async (req, res) => {
  const { Username } = req.params;

  try {
      const allOrders = await Order.find({ PatientUsername: Username });

      // Separating current and past orders
      const currentOrders = allOrders.filter(order => 
          ["Pending", "Confirmed"].includes(order.Status));
      const pastOrders = allOrders.filter(order => 
          ["Delivered", "Cancelled"].includes(order.Status));

      res.status(200).json({
          currentOrders,
          pastOrders
      });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
const getPatientWalletAmount = async (req, res) => {
  const { Username } = req.params;

  try {
      const patient = await Patient.findOne({ Username });
      if (!patient) {
          return res.status(404).json({ error: 'Patient not found' });
      }

      res.status(200).json({ walletAmount: patient.WalletAmount });
  } catch (error) {
      res.status(500).json({ error: error.message });
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
  checkoutOrder,
  viewAlternatives,
  getPatientWalletAmount,
  getAllOrders,
  getPatientWalletAmount
};