const { default: mongoose } = require('mongoose');
const Medicine = require('../Models/medicine');
const Patient = require('../Models/patient');
const Order = require('../Models/Order');

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

module.exports = {
  availableMedicinesDetailsByPatient,
  getMedicineByName,
  getMedicineByMedicalUse,
  choosePaymentMethod
};