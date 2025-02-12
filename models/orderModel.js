const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderModel = new Schema({
  name: {
    type: String,
    default: 'name'
  },
  email: {
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
  apartment: {
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
  zipcode: {
    type: String,
    default: 'zip code' 
  },
  anonymous: {
    type: Boolean,
    default: true
  },
  sent: {
    type: Boolean, 
    default: false
  }
},{
  timestamps: true,
})

module.exports = mongoose.model('Order', orderModel)