const patientModel = require('./Models/patient.js');
const PharmacistRegistrationRequest = require('./Models/pharmacistRegistrationRequest');

async function isUsernameUnique(username) {
  const patientExists = await patientModel.findOne({ Username: username });
  const pharmacistExists = await PharmacistRegistrationRequest.findOne({ Username: username });
  return !patientExists && !pharmacistExists;
}

async function isEmailUnique(email) {
  const patientExists = await patientModel.findOne({ Email: email });
  const pharmacistExists = await PharmacistRegistrationRequest.findOne({ Email: email });
  return !patientExists && !pharmacistExists;
}

module.exports = { isUsernameUnique, isEmailUnique };
