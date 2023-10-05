const express = require('express');

// controller functions
const registerPatient= require('../Controllers/patientController');
const pharmacistRequest = require('../Controllers/pharmacistRegistrationController');


const router = express.Router();

// register route
router.post('/Register', registerPatient);
router.post('/Request', pharmacistRequest);


module.exports = router;