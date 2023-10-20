const { default: mongoose } = require('mongoose');
const Patient = require('../Models/patient.js');
const PharmacistRequest = require("../Models/pharmacistRequest.js")
const { isUsernameUnique, isEmailUnique } = require('../utils');
const validator = require('validator');


// Task 1 : register as a patient
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
    console.log("hadwa",Username);
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // res.setHeader('Access-Control-Allow-Methods', POST, DELETE, GET, PUT );
  // req.setHeader('Access-Control-Allow-Methods', POST, DELETE, GET, PUT );
  // req.setHeader('Access-Control-Allow-Origin', '*');
  // req.setHeader('Access-Control-Allow-Credentials', true);

    try {

       if (!(await isUsernameUnique(Username))) {
           throw new Error('Username is already taken.');
          }
      
          if (!(await isEmailUnique(Email))) {
           throw new Error('Email is already in use.');
          }
        const patient = await Patient.register(
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

//Task 2: submit a request to register as a pharmacist
const submitRequestToBePharmacist = async (req, res) => {
    const {
      Username,
      Name,
      Email,
      Password,
      DateOfBirth,
      HourlyRate,
      Affiliation,
      EducationalBackground
    } = req.body;
    res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  
    // try {
    //   // validation checks
    //   if (!Username || 
    //       !Name || 
    //       !Email || 
    //       !Password || 
    //       !DateOfBirth || 
    //       !HourlyRate || 
    //       !Affiliation || 
    //       !EducationalBackground) {
    //     throw new Error('All fields must be filled.');
    //   }
  
    //   if (!(await isUsernameUnique(Username))) {
    //     throw new Error('Username is already taken.');
    //   }
  
    //   if (!(await isEmailUnique(Email))) {
    //     throw new Error('Email is already in use.');
    //   }
  
    //   if (!validator.isEmail(Email)) {
    //     throw new Error('Email must be in the form of johndoe@example.com');
    //   }
  
    try{
      const request = await PharmacistRequest.create({
        Username,
        Name,
        Email,
        Password,
        DateOfBirth,
        HourlyRate,
        Affiliation,
        EducationalBackground
      });
  
      res.status(200).json({ request });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

module.exports = {
    registerPatient,
    submitRequestToBePharmacist
};