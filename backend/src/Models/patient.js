const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const Cart = require('./cart.js');
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
    enum: ['female', 'male']
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
  Prescriptions:{
    type: Array,
    required: false
  },
  addresses: {
    // type: [{
    //   street: { type: String, required: true },
    //   city: { type: String, required: true },
    //   state: { type: String, required: true },
    //   Building: { type: Number, required: true },
    //   country: { type: String, required: true },
    // }],
    type:String,
    required: true,
  //  validate: [arrayLimit, '{PATH} does not have enough information.']
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  }
  
  }, { timestamps: true });



  patientSchema.statics.register = async function (
    Username,
    Name,
    Email,
    Password,
    DateOfBirth,
    Gender,
    MobileNumber,
    EmergencyContactName,
    EmergencyContactMobile,
    EmergencyContactRelation,
    addresses
  ) {
    
    if (
      !Username ||
      !Name ||
      !Email ||
      !Password ||
      !DateOfBirth ||
      !Gender ||
      !MobileNumber ||
      !EmergencyContactName ||
      !EmergencyContactMobile ||
      !EmergencyContactRelation ||
      ! addresses
    ) {
      throw Error('All fields must be filled.');
    }
    
    if (!validator.isEmail(Email)) {
      throw Error('Invalid email format.');
    }
  
    const existsUsername = await this.findOne({ Username });
    const existsEmail = await this.findOne({ Email });
  
    if (existsUsername) {
      throw new Error('Username is already taken.');
    }
  
    if (existsEmail) {
      throw new Error('Email is already in use.');
    }
  
    const newCart = await Cart.create({
      items: [],
      totalAmount: 0,
    });
    const patient = await this.create({
      Username,
      Name,
      Email,
      Password,
      DateOfBirth,
      Gender,
      MobileNumber,
      EmergencyContactName,
      EmergencyContactMobile,
      EmergencyContactRelation,
      addresses,
      cart: newCart._id  
    });
  
    return patient;
  };
  
  const Patient = mongoose.model('Patient', patientSchema);
  module.exports = Patient;