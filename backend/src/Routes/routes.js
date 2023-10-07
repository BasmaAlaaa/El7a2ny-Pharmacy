const express = require('express');

// Administrator Controller
const {
    addAdmin,
    removePatientOrPharmacist,
    infosOfAPharmacistRequest,
    infosOfRequestsByPharmacist,
    availableMedicinesDetailsByAdmin,
    pharmacistInfo,
    allPharmacists,
    allPatients,
    patientInfo
} = require('../Controllers/administratorController');

// Guest Controller
const {
    registerPatient,
    submitRequestToBePharmacist
}= require('../Controllers/guestController');

// Patient Controller\
const {
    availableMedicinesDetailsByPatient
} = require('../Controllers/patientController');

// Pharmacist Controller
const {
    availableMedicinesDetailsByPharmacist,
    availableMedicinesQuantity,
    medQuantityAndSales,
    addMedicine, 
    updateMed
} = require('../Controllers/pharmacistController');



const router = express.Router();

//Routes of Administrator
router.post('/AddAdmin', addAdmin);
router.delete('/RemovePatientOrPharmacist/:Username', removePatientOrPharmacist);
router.get('/InfosOfAPharmacistRequest/:Username', infosOfAPharmacistRequest);
router.get('/InfosOfRequestsByPharmacist', infosOfRequestsByPharmacist);
router.get('/AvailableMedicinesDetailsByAdmin', availableMedicinesDetailsByAdmin);
router.get('/PharmacistInfo/:Username', pharmacistInfo);
router.get('/AllPharmacists', allPharmacists);
router.get('/AllPatients', allPatients);
router.get('/PatientInfo/:Username', patientInfo);

// Routes of Guest
router.post('/RegisterPatient', registerPatient);
router.post('/SubmitRequestToBePharmacist', submitRequestToBePharmacist);

// Routes of Patient
router.get('/AvailableMedicinesDetailsByPatient',availableMedicinesDetailsByPatient);

// Routes of Pharmacist
router.get('/AvailableMedicinesDetailsByPharmacist',availableMedicinesDetailsByPharmacist);
router.get('/AvailableMedicinesQuantity',availableMedicinesQuantity);
router.get('/MedQuantityAndSales/:Name',medQuantityAndSales);
router.post('/AddMedicine',addMedicine);
router.put('/UpdateMed/:Name',updateMed);

module.exports = router;