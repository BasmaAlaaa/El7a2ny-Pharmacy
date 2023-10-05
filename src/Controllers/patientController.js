const patientModel = require('../Models/patient.js');
const { default: mongoose } = require('mongoose');
const { isUsernameUnique, isEmailUnique } = require('../utils');

// register patient
const registerPatient = async (req, res) => {

    const { 
        Username,
        Name,
        Email,
        Password,
        DateOfBirth,
        Gender,
        MobileNumber,
        EmergencyContactName,
        EmergencyContactMobile,
        EmergencyContactRelation 
    } = req.body;

    try {

        if (!(await isUsernameUnique(Username))) {
            throw new Error('Username is already taken.');
          }
      
          if (!(await isEmailUnique(Email))) {
            throw new Error('Email is already in use.');
          }
        const patient = await patientModel.register(
            Username,
            Name,
            Email,
            Password,
            DateOfBirth,
            Gender,
            MobileNumber,
            EmergencyContactName,
            EmergencyContactMobile,
            EmergencyContactRelation
          );
          
        await patient.save();
        res.status(200).json({patient})
    } catch(error) {
        res.status(400).json({ error: error.message})
    }
}

module.exports = registerPatient