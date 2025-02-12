const express = require('express');
const Order = require('../models/orderModel');
const passport = require('passport');

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router();

// create an order

// get all orders

// get an order

// update an order

// delete an order

module.exports = router;