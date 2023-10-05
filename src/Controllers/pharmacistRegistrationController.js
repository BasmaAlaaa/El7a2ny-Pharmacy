const PharmacistRegistrationRequest = require('../Models/pharmacistRegistrationRequest');
const { default: mongoose } = require('mongoose');
const validator = require('validator');
const { isUsernameUnique, isEmailUnique } = require('../utils');

const pharmacistRegistraion = async (req, res) => {
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

  try {
    // validation checks
    if (!Username || 
        !Name || 
        !Email || 
        !Password || 
        !DateOfBirth || 
        !HourlyRate || 
        !Affiliation || 
        !EducationalBackground) {
      throw new Error('All fields must be filled.');
    }

    if (!(await isUsernameUnique(Username))) {
      throw new Error('Username is already taken.');
    }

    if (!(await isEmailUnique(Email))) {
      throw new Error('Email is already in use.');
    }

    if (!validator.isEmail(Email)) {
      throw new Error('Email must be in the form of johndoe@example.com');
    }

    const request = await PharmacistRegistrationRequest.create({
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

module.exports = pharmacistRegistraion;
