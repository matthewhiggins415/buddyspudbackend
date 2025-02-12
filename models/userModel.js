const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String, 
    required: true, 
    unique: true
  },
  isAdmin: {
    type: Boolean, 
    default: true
  }, 
  hashedPassword: {
    type: String, 
    required: true
  },
  token: String,
}, {
  timestamps: true, 
  toJSON: {
    // remove `hashedPassword` field when we call `.toJSON`
    transform: (_doc, user) => {
      delete user.hashedPassword
      return user
    }
  }
})

module.exports = mongoose.model('User', userSchema)