const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const User = require('./user');

const administratorSchema = new Schema({
  Username: {
    type: String,
    required: true,
    unique: true
  },  
  Password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

administratorSchema.statics.addAdmin = async function (
    Username,
    Password) {

    // validation 
    if (!Username || !Password) { 
        throw Error('All fields must be filled.');
    }
    
    const existsUsername = await this.findOne({ Username }) || await User.findOne({ Username });
  
    if (existsUsername) {
      throw new Error('Username is already taken.');
    }

    const administrator = await this.create({
      Username,
      Password
    });
    administrator = await User.create({
        Username,
        Password
      });
  
    return administrator;
  };

const Administrator = mongoose.model('Administrator', administratorSchema);
module.exports = Administrator;