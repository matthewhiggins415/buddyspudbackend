const express = require('express');
const Order = require('../models/orderModel');
const passport = require('passport');
const stripe = require('stripe')(process.env.STRIPE_TEST_KEY);
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const YOUR_DOMAIN = process.env.YOUR_DOMAIN;
const price_id= process.env.PRICE_ID;
// Add an endpoint on your server that creates a Checkout Session, setting the ui_mode to embedded.
// The Checkout Session response includes a client secret, which the client uses to mount Checkout. Return the client_secret in your response.
router.post('/create-checkout-session', async (req, res) => {
    try {
      const session = await stripe.checkout.sessions.create({
        ui_mode: 'embedded',
        line_items: [
          {
            price: price_id, // Replace with a valid Price ID
            quantity: 1,
          },
        ],
        mode: 'payment',
        return_url: `${YOUR_DOMAIN}/return?session_id={CHECKOUT_SESSION_ID}`,
      });
  
      res.json({ clientSecret: session.client_secret });
    } catch (error) {
      console.error('Stripe Checkout Error:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
router.get('/session-status', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  
    res.send({
      status: session.status,
      customer_email: session.customer_details.email
    });
});


module.exports = router;