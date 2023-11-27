const express = require('express');
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
    addPharmacist,
    acceptOrRejectPharmacistRequest
} = require('../Controllers/administratorController');

// Guest Controller
const {
    registerPatient,
    submitRequestToBePharmacist
} = require('../Controllers/guestController');

// Patient Controller
const {
    availableMedicinesDetailsByPatient,
    getMedicineByName,
    getMedicineByMedicalUse,
    addAddressToPatient,
    getPatientAddresses,
    getOrderDetails,
    cancelOrder,
    viewCartItems,
    removeAnItemFromCart,
    addMedicineToCart,
    updateMedicineQuantityInCart,
    checkoutOrder
} = require('../Controllers/patientController');

// Pharmacist Controller
const {
    availableMedicinesDetailsByPharmacist,
    availableMedicinesQuantity,
    medQuantityAndSales,
    addMedicine,
    updateMed
} = require('../Controllers/pharmacistController');

const { verify } = require('../Controllers/loginController');

//Routes of Administrator
router.post('/AddAdmin/:username', verify, addAdmin);
router.post('/AddPharmacist/:username', verify, addPharmacist);
router.delete('/RemovePatientOrPharmacist/:username/:Username', verify, removePatientOrPharmacist);
router.get('/InfosOfAPharmacistRequest/:username/:Username', verify, infosOfAPharmacistRequest);
router.get('/InfosOfRequestsByPharmacist/:username', verify, infosOfRequestsByPharmacist);
router.get('/AvailableMedicinesDetailsByAdmin/:username', verify, availableMedicinesDetailsByAdmin);
router.get('/PharmacistInfo/:username/:Username', verify, pharmacistInfo);
router.get('/AllPharmacists/:username', verify, allPharmacists);
router.get('/AllPatients/:username', verify, allPatients);
router.get('/PatientInfo/:username/:Username', verify, patientInfo);
router.get('/MedicineByName/:username/:Name', verify, getMedicineByName);
router.get('/MedicineByMedicalUse/:username/:MedicalUse', verify, getMedicineByMedicalUse);
router.post('/AcceptOrRejectPharmacistRequest/:username/:Username', verify, acceptOrRejectPharmacistRequest);

// Routes of Guest
router.post('/RegisterPatient', registerPatient);
router.post('/SubmitRequestToBePharmacist', upload.fields([
    { name: 'IDDocument', maxCount: 1 },
    { name: 'PharmacyDegreeDocument', maxCount: 1 },
    { name: 'WorkingLicenseDocument', maxCount: 1 },
]), submitRequestToBePharmacist);

// Routes of Patient
router.get('/AvailableMedicinesDetailsByPatient', availableMedicinesDetailsByPatient);
router.get('/MedicineByName/:Name', getMedicineByName);
router.get('/MedicineByMedicalUse/:MedicalUse', getMedicineByMedicalUse);
router.post('/AddAddressToPatient/:Username', addAddressToPatient);
router.get('/GetPatientAddresses/:Username', getPatientAddresses);
router.get('/GetOrderDetails/:Username', getOrderDetails);
router.put('/CancelOrder/:orderId', cancelOrder);
router.get('/viewCartItems/:Username', viewCartItems);
router.delete('/removeItemFromCart/:Username/:MedicineName', removeAnItemFromCart);
router.post('/addMedicineToCart/:Username/:MedicineName', addMedicineToCart);
router.put('/updateQuantity/:Username/:MedicineName/:quantity', updateMedicineQuantityInCart);
router.post('/checkoutOrder/:Username/:paymentMethod/:ShippingAddress', checkoutOrder);

// Routes of Pharmacist
router.get('/AvailableMedicinesDetailsByPharmacist', availableMedicinesDetailsByPharmacist);
router.get('/AvailableMedicinesQuantity', availableMedicinesQuantity);
router.get('/MedQuantityAndSales/:Name', medQuantityAndSales);
router.post('/AddMedicine', upload.single('Picture'), addMedicine);
router.put('/UpdateMed/:Name', upload.single('Picture'), updateMed);
router.get('/MedicineByName/:Name', getMedicineByName);
router.get('/MedicineByMedicalUse/:MedicalUse', getMedicineByMedicalUse);


module.exports = router;