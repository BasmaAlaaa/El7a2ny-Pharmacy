const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medecineSchema = new Schema({
    //ingredients (array), Price number, quantity number
  name : {
    type: String,
    required: true,
    unique: true
  },
  activeingredients: {
    type: Array,
    required: true,
  },
  Price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
  }
  
}, { timestamps: true });

const medecineDetails = mongoose.model('medecine', medecineSchema);
module.exports = medecineDetails;
