const express = require('express');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../../../frontend/public/uploads');
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    }
});

const allowedFileTypes = ['pdf', 'jpeg', 'jpg', 'png'];

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase();
  if (allowedFileTypes.includes(extname.substr(1))) {
    return cb(null, true);
  }
  return cb(new Error('Invalid file type. Only PDF, JPEG, JPG, and PNG files are allowed.'));
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

const router = express.Router();

const upload = require('./multer-config');

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

module.exports = {router, upload};