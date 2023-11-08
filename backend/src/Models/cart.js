const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const cartSchema = new Schema({
  Items: [{
    Medicine: {
      type: Schema.Types.ObjectId,
      ref: 'Medicine',
    },
    Quantity:{
        type: Number,
        default: 0,
    }
  }],
    TotalAmount: {
      type: Number,
      default: 0,
    },
  });
  
  const Cart = mongoose.model('Cart', cartSchema);
  
  module.exports = Cart;