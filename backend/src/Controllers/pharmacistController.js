const { default: mongoose } = require('mongoose');
const Medicine = require("../Models/medicine");

// Task 12: view a list of all available medicines
const availableMedicinesDetailsByPharmacist = async (req, res) => {
  const medicines = await Medicine.find();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  if(!medicines){
      res.status(400).json({error: "There are no available medicines!"})
  }
  res.status(200).json(medicines.map(({Name, ActiveIngredients, Price, Picture, MedicalUse, Quantity, QuantitySold}) => ({Name, ActiveIngredients, Price, Picture, MedicalUse, Quantity, QuantitySold})));
}

//View all medicines'Quantities and Sales
const availableMedicinesQuantity = async (req, res) => {
  const medicines = await Medicine.find();
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  if(!medicines){
    res.status(400).json({error: "There are no available medicines!"})
}
res.status(200).json(medicines.map(
  ({Name, Picture, Quantity, QuantitySold}) => 
  ({Name, Picture, Quantity, QuantitySold})
  ));
}

// Task 13: view available quantity and sales of each medicine
const medQuantityAndSales = async (req, res) => {
  const {Name} = req.params;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  const medicine = await Medicine.findOne({Name: Name},{_id:0, Price:0, ActiveIngredients:0});
  if(!medicine){
    res.status(400).json({error: "This medicine doesn't exist!"})
}
res.status(200).json(medicine);
}

// Task 16: Add a medicine to DB
const addMedicine = async (req, res) => {
    const {Name, ActiveIngredients, Price, Quantity, Picture, QuantitySold, MedicalUse} = req.body;
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
//   req.setHeader('Access-Control-Allow-Origin', '*')

    try {
        // Check if the medicine already exists
        const medecineExists = await Medicine.findOne({Name: Name});

        if (medecineExists) {
            return res.status(400).json({ error: "This medicine already exists!" });
        }

        // If the medicine doesn't exist, proceed to create a new one
        const newMed = await Medicine.create({
            Name,
            ActiveIngredients,
            Price,
            Quantity,
            Picture,
            QuantitySold,
            MedicalUse
          });       
          await newMed.save();
        res.status(200).json(newMed);
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
};

// const addMedicine = async (req, res) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   try {

//     upload.single('Picture')(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ error: 'File upload failed.' });
//       }

//       const { Name, ActiveIngredients, Price, Quantity, QuantitySold, MedicalUse } = req.body;

//       try {
//         // Check if the medicine already exists
//         const medicineExists = await Medicine.findOne({ Name: Name });

//         if (medicineExists) {
//           return res.status(400).json({ error: 'This medicine already exists!' });
//         }

//         // If the medicine doesn't exist, proceed to create a new one
//         const newMed = await Medicine.create({
//           Name,
//           ActiveIngredients,
//           Price,
//           Quantity,
//           QuantitySold,
//           MedicalUse,
//           Picture: req.file.filename,
//         });

//         res.status(200).json(newMed);
//       } catch (error) {
//         res.status(500).json({ error: error.message });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


//Task 18: Update a medicine in the database
const updateMed = async (req, res) => {
    const {Name} = req.params;
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

    const medExists = await Medicine.findOne({Name: Name});
    if(!medExists){
        return res.status(404).json({error : "This medicine doesn't exists!"})
    }

    const updateMed = await Medicine.findOneAndUpdate({Name: Name},{
        ...req.body
    });
    console.log("updatedMed",updateMed)

    if(!updateMed){
        return res.status(404).json({error : "No possible updates!"})
    }

    const updatedMed = await Medicine.findOne({Name: Name});

    res.status(200).json(updatedMed);
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

module.exports = {
  availableMedicinesDetailsByPharmacist,
  availableMedicinesQuantity,
  medQuantityAndSales,
  addMedicine, 
  updateMed,
  getMedicineByName,
  getMedicineByMedicalUse
};
