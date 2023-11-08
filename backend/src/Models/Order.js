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
    },
    Status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Confirmed",  "Delivered", "Cancelled"],
        required: true
    }
},

{ timestamps: true })

orderSchema.statics.register = async function (
    PaymentMethod,
    PatientUsername
  ) {

    // validation 
    if (!PatientUsername 
        ) { 
    throw Error('All fields must be filled.');
}
if (!PaymentMethod) { 
    throw Error('Payment method must be specified.');
}

    const order = await this.create({
        PatientUsername,
        PaymentMethod
    });
  
    return order;
  };
  const Order = mongoose.model('Order', orderSchema);
  module.exports = Order;