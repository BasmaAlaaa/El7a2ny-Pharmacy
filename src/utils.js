const patientModel = require('./Models/patient.js');
const PharmacistRegistrationRequest = require('./Models/pharmacistRegistrationRequest');
const administratorModel = require('./Models/administrator.js');

async function isUsernameUnique(username) {
  const patientExists = await patientModel.findOne({ Username: username });
  const pharmacistExists = await PharmacistRegistrationRequest.findOne({ Username: username });
  const adminExists = await administratorModel.findOne({ Username: username });
  return !patientExists && !pharmacistExists && !adminExists;
}

async function isEmailUnique(email) {
  const patientExists = await patientModel.findOne({ Email: email });
  const pharmacistExists = await PharmacistRegistrationRequest.findOne({ Email: email });
  return !patientExists && !pharmacistExists;
}

module.exports = { isUsernameUnique, isEmailUnique };
