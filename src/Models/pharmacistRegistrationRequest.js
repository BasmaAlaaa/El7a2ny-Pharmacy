const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pharmacistRegistrationRequestSchema = new Schema({
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
    required: true
  },
  DateOfBirth: {
    type: Date,
    required: true
  },
  HourlyRate: {
    type: Number,
    required: true
  },
  Affiliation: {
    type: String,
    required: true
  },
  EducationalBackground: {
    type: String,
    required: true
  },
  Status: {
    type: String,
    default: 'pending', 
    enum: ['pending', 'accepted', 'rejected']
  }
}, { timestamps: true });

const PharmacistRegistrationRequest = mongoose.model('PharmacistRegistration', pharmacistRegistrationRequestSchema);
module.exports = PharmacistRegistrationRequest;
