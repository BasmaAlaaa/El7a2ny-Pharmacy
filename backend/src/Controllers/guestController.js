const { default: mongoose } = require('mongoose');
const Patient = require('../Models/patient.js');
const PharmacistRequest = require("../Models/pharmacistRequest.js")
const { isUsernameUnique, isEmailUnique } = require('../utils');
const validator = require('validator');
const upload = require('../Routes/multer-config');


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
    res.status(200).json({ patient })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

<<<<<<< Updated upstream
//Task 2: submit a request to register as a pharmacist
const submitRequestToBePharmacist = async (req, res) => {
    const {
=======
// Tasks 1 and 9 : register as a pharmacist
const submitRequestToBePharmacist = async (req, res) => {

  // const files = upload.fields([
  //   { name: 'IDDocument', maxCount: 1 },
  //   { name: 'PharmacyDegreeDocument', maxCount: 1 },
  //   { name: 'WorkingLicenseDocument', maxCount: 1 },
  // ]);

  console.log(req.files);

  const {
    Username,
    Name,
    Email,
    Password,
    DateOfBirth,
    HourlyRate,
    Affiliation,
    EducationalBackground,
  } = req.body;

  try {
    if (!req.files || !req.files['IDDocument'] || !req.files['PharmacyDegreeDocument'] || !req.files['WorkingLicenseDocument']) {
      return res.status(400).json('Missing file(s)');
    }



    if (!(await isUsernameUnique(Username))) {
      res.status(400).json('Username is already taken.');
    }

    if (!(await isEmailUnique(Email))) {
      res.status(400).json('Email is already in use.');
    }

    const request = new PharmacistRequest({
>>>>>>> Stashed changes
      Username,
      Name,
      Email,
      Password,
      DateOfBirth,
      HourlyRate,
      Affiliation,
<<<<<<< Updated upstream
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
=======
      EducationalBackground,
      IDDocument: req.files['IDDocument'][0].path,
      PharmacyDegreeDocument: req.files['PharmacyDegreeDocument'][0].path,
      WorkingLicenseDocument: req.files['WorkingLicenseDocument'][0].path
    });

    request.save();
    res.status(200).json({ request });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
>>>>>>> Stashed changes

module.exports = {
  registerPatient,
  submitRequestToBePharmacist
};