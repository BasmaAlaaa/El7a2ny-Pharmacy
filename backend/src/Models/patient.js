const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const Cart = require('./Cart.js');
function arrayLimit(val) {
  return val.length > 0;
}


const patientSchema = new Schema({
  Username: {
    type: String,
    required: true,
    unique: true
  },  
  Name: {
      type: String,
      required: true
    },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Password: {
    type: String,
    required: true,
  },
  DateOfBirth: {
    type: Date,
    required: true
  },
  Gender: {
    type: String,
    required: true,
    enum: ['female', 'male', 'Male', 'Female']
  },
  MobileNumber: {
    type: String,
    required: true
  },
  EmergencyContactName: {
    type: String,
    required: true
  },
  EmergencyContactMobile: {
    type: String,
    required: true
  },
  EmergencyContactRelation: {
    type: String,
    required: true
  },
  Prescriptions: [{
    medicines: [{ type: String }],
    status: { type: String, default: 'unfilled' }
  }],
  addresses: 
 [{
      type:String,
      required: false,
 }],
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart',
  },
  StripeCustomerId: {
    type: String,
    required: false
  },
  WalletAmount: {
    type: Number,
    default: 0
  },
  }, { timestamps: true });

  
  const Patient = mongoose.model('Patient', patientSchema);
  module.exports = Patient;