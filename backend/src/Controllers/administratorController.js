const { default: mongoose } = require('mongoose');
const Administrator = require('../Models/administrator');
const Patient = require('../Models/patient');
const Pharmacist = require('../Models/pharmacist');
const PharmacistRequest = require('../Models/pharmacistRequest');
const Medicine = require('../Models/medicine');
const { isUsernameUnique, isEmailUnique } = require('../utils');

// Task 5 : Add an admin
const addAdmin = async (req, res) => {
    const { 
        Username,
        Password 
    } = req.body;
res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

    try {
        if (!(await isUsernameUnique(Username))) {
            throw new Error('Username is already taken.');
          }

          if (!Username || !Password) { 
            throw Error('All fields must be filled.');
        }
    
        const administrator = await Administrator.create({
          Username,
          Password
        });
        await administrator.save();
        res.status(200).json({administrator})
    } catch(error) {
        res.status(400).json({ error: error.message})
    }
}

// Task 6 : Remove a patient or a pharmacist from database
const removePatientOrPharmacist = async (req, res) => {
        const {Username} = req.params;
        res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

        const patient = await Patient.findOneAndDelete({Username: Username})
        const pharmacist = await Pharmacist.findOneAndDelete({Username: Username})

        if(!patient && !pharmacist){
            return res.status(400).json({error: "This user doesn't exist."})
        }else if(patient && !pharmacist){
            res.status(200).json(patient)
        }else if(!patient && pharmacist){
            res.status(200).json(pharmacist)
        }
}

// Task 7 : view all infos of pharmacists' requests that want to apply to the platform
const infosOfAPharmacistRequest = async (req, res) => {
    const {Username} = req.params;
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

    const pharmacistsRequest = await PharmacistRequest.findOne({Username: Username});
    if(!pharmacistsRequest){
        return res.status(400).json({error: "There are no requests made by this pharmacist!"})
    }
    res.status(200).json(pharmacistsRequest);
}

const infosOfRequestsByPharmacist = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
    const pharmacistsRequests = await PharmacistRequest.find({}).sort({createdAt: -1});
    if(!pharmacistsRequests){
        return res.status(400).json({error: "There are no requests made by pharmacists."})
    }
    res.status(200).json(pharmacistsRequests);
}

// Task 12: view a list of all available medicines' details
const availableMedicinesDetailsByAdmin = async (req, res) => {
    const medicines = await Medicine.find({});
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
    if(!medicines){
        return res.status(400).json({error: "There are no available medicines!"})
    }
    res.status(200).json(medicines.map(({Name, ActiveIngredients, Price, Picture}) => ({Name, ActiveIngredients, Price, Picture})));
}

// Task 22: view pharmacist's info
const pharmacistInfo = async (req, res) => {
    const {Username} = req.params;
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

    const pharmacist = await Pharmacist.findOne({Username: Username},{_id:0, Password:0});
    if(!pharmacist){
        return res.status(400).json({error: "This pharmacist does not exist!"})
    }
    res.status(200).json(pharmacist);
}

const allPharmacists = async (req, res) => {
    const pharmacists = await Pharmacist.find();
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
    if(!pharmacists){
        return res.status(400).json({error: "No registered pharmacists!"})
    }
    res.status(200).json(pharmacists.map(
        ({Username, Name, Email, DateOfBirth, HourlyRate, Affiliation, EducationalBackground}) => 
        ({Username, Name, Email, DateOfBirth, HourlyRate, Affiliation, EducationalBackground})
    ));
}

const allPatients = async (req,res) => {
    const patients = await Patient.find();
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
    if(!patients){
        return res.status(400).json({error: "No registered patients!"})
    }
    res.status(200).json(patients.map(
        ({Username, Name, Email, DateOfBirth, Gender, MobileNumber}) => 
        ({Username, Name, Email, DateOfBirth, Gender, MobileNumber})
    ));
}

// Task 23: view patient's info
const patientInfo = async (req, res) => {
    const {Username} = req.params;
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

    const info = await Patient.findOne({Username: Username},{ _id: 0, Password: 0, Prescriptions: 0, EmergencyContactMobile: 0, EmergencyContactName:0, EmergencyContactRelation:0 });
    if(!info){
        return res.status(400).json({error: "This patient does not exist!"})
    }
    
        res.status(200).json(info);
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
  
const addPharmacist = async (req, res) => {
    const {UserName, Name, Email, Password, DateOfBirth, HourlyRate, Affiliation, EducationalBackground} = req.body;

    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

    try {
        if (!(await isUsernameUnique(Username))) {
            throw new Error('Username is already taken.');
          }

          if (!Username || !Password) { 
            throw Error('All fields must be filled.');
        }
    
        const pharmacist = await Administrator.create({
            UserName,
            Name, 
            Email, 
            Password, 
            DateOfBirth, 
            HourlyRate, 
            Affiliation, 
            EducationalBackground
        });
        await pharmacist.save();
        res.status(200).json({pharmacist})
    } catch(error) {
        res.status(400).json({ error: error.message})
    }
}

module.exports = {addAdmin,
    removePatientOrPharmacist,
    infosOfRequestsByPharmacist,
    availableMedicinesDetailsByAdmin,
    infosOfAPharmacistRequest,
    pharmacistInfo,
    allPharmacists,
    allPatients,
    patientInfo,
    getMedicineByName,
    getMedicineByMedicalUse,
    addPharmacist
};