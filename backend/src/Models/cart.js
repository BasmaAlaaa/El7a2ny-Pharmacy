const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const cartSchema = new Schema({
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Medicine',
      },
    ],
    totalAmount: {
      type: Number,
      default: 0,
    },
  });
  
  const Cart = mongoose.model('Cart', cartSchema);
  
  module.exports = Cart;