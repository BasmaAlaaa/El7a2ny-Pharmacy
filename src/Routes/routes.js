const express = require('express');

// controller functions
const registerPatient= require('../Controllers/patientController');
const pharmacistRequest = require('../Controllers/pharmacistRegistrationController');
const {addAdmin,
    removePatientOrPharmacist}
     = require('../Controllers/administratorController');


const router = express.Router();

// register route
router.post('/Register', registerPatient);
router.post('/Request', pharmacistRequest);
router.post('/addAdmin', addAdmin);
router.delete('/removePatientOrPharmacist/:Username', removePatientOrPharmacist)


module.exports = router;