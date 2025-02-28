const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderModel = new Schema({
  customerName: {
    type: String,
    default: 'name'
  },
  customerEmail: {
    type: String,
    default: 'email'
  },
  recipientName: {
    type: String,
    default: 'recipient name' 
  },
  businessName: {
    type: String,
    default: 'business name' 
  },
  address: {
    type: String,
    default: 'address' 
  },
  unitNumber: {
    type: String,
    default: 'apartment' 
  },
  city: {
    type: String,
    default: 'city' 
  },
  state: {
    type: String,
    default: 'state' 
  },
  country: {
    type: String,
    default: 'country' 
  },
  zipCode: {
    type: String,
    default: 'zip code' 
  },
  isSent: {
    type: String, 
    default: 'not sent'
  }
},{
  timestamps: true,
})

module.exports = mongoose.model('Order', orderModel)