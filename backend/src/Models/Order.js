const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const orderSchema = new Schema({    
    PatientUsername:{
        type: String,
        ref: 'Patient',
        required: true
    },
    PaymentMethod: {
        type: String,
        default: "Wallet",
        enum: ["wallet","Wallet","Credit Card","credit card","Cash On Delivery","COD","cash on delivery"]
    }

},{ timestamps: true })

orderSchema.statics.register = async function (
    PaymentMethod,
    PatientUsername
  ) {

    // validation 
    if (!PatientUsername 
        ) { 
    throw Error('All fields must be filled.');
}
    const order = await this.create({
        PatientUsername,
        PaymentMethod
    });
  
    return order;
  };
  const Order = mongoose.model('Order', orderSchema);
  module.exports = Order;