const express = require('express');
<<<<<<< Updated upstream
=======

const upload = require('./multer-config');

const router = express.Router();
>>>>>>> Stashed changes

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
    patientInfo,
    addPharmacist,acceptOrRejectPharmacistRequest
} = require('../Controllers/administratorController');

// Guest Controller
const {
    registerPatient,
    submitRequestToBePharmacist
}= require('../Controllers/guestController');

// Patient Controller
const {
    availableMedicinesDetailsByPatient, getMedicineByName, getMedicineByMedicalUse
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
router.post('/AddPharmacist', addPharmacist);
router.delete('/RemovePatientOrPharmacist/:Username', removePatientOrPharmacist);
router.get('/InfosOfAPharmacistRequest/:Username', infosOfAPharmacistRequest);
router.get('/InfosOfRequestsByPharmacist', infosOfRequestsByPharmacist);
router.get('/AvailableMedicinesDetailsByAdmin', availableMedicinesDetailsByAdmin);
router.get('/PharmacistInfo/:Username', pharmacistInfo);
router.get('/AllPharmacists', allPharmacists);
router.get('/AllPatients', allPatients);
router.get('/PatientInfo/:Username', patientInfo);
router.get('/MedicineByName/:Name',getMedicineByName);
router.get('/MedicineByMedicalUse/:MedicalUse',getMedicineByMedicalUse);
router.post('/AcceptOrRejectPharmacistRequest/:Username', acceptOrRejectPharmacistRequest);

// Routes of Guest
router.post('/RegisterPatient', registerPatient);
router.post('/SubmitRequestToBePharmacist', upload.fields([
    { name: 'IDDocument', maxCount: 1 },
    { name: 'PharmacyDegreeDocument', maxCount: 1 },
    { name: 'WorkingLicenseDocument', maxCount: 1 },
  ]), submitRequestToBePharmacist);

// Routes of Patient
router.get('/AvailableMedicinesDetailsByPatient',availableMedicinesDetailsByPatient);
router.get('/MedicineByName/:Name',getMedicineByName);
router.get('/MedicineByMedicalUse/:MedicalUse',getMedicineByMedicalUse);


// Routes of Pharmacist
router.get('/AvailableMedicinesDetailsByPharmacist',availableMedicinesDetailsByPharmacist);
router.get('/AvailableMedicinesQuantity',availableMedicinesQuantity);
router.get('/MedQuantityAndSales/:Name',medQuantityAndSales);
router.post('/AddMedicine',addMedicine);
router.put('/UpdateMed/:Name',updateMed);
router.get('/MedicineByName/:Name',getMedicineByName);
router.get('/MedicineByMedicalUse/:MedicalUse',getMedicineByMedicalUse);

module.exports = router;