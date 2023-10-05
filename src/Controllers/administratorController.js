const administratorModel = require('../Models/administrator');
const { default: mongoose } = require('mongoose');
const User = require('../Models/user');
const Patient = require('../Models/patient');
const Pharmacist = require('../Models/pharmacist');

// Add an admin
const addAdmin = async (req, res) => {
    const { 
        Username,
        Password 
    } = req.body;

    try {
        const admin = await administratorModel.addAdmin(
            Username,
            Password
          );
          
        await admin.save();
        res.status(200).json({admin})
    } catch(error) {
        res.status(400).json({ error: error.message})
    }
}

const removePatientOrPharmacist = async (req, res) => {
        const {Username} = req.params;

        const patient = await Patient.findOneAndDelete({Username: Username})
        const pharmacist = await Pharmacist.findOneAndDelete({Username: Username})

        if(!patient && !pharmacist){
            return res.status(400).json({error: "This user doesn't exist"})
        }else if(patient && !pharmacist){
            res.status(200).json(patient)
        }else if(!patient && pharmacist){
            res.status(200).json(pharmacist)
        }
        
}

module.exports = {addAdmin,removePatientOrPharmacist};