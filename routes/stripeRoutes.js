const express = require('express');
const Order = require('../models/orderModel');
const passport = require('passport');

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_TEST);

const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

const domain = process.env.TEST_DOMAIN;
const price_id = process.env.PRICE_ID_TEST;

// console.log("env price", price_id)
// Add an endpoint on your server that creates a Checkout Session, setting the ui_mode to embedded.
// The Checkout Session response includes a client secret, which the client uses to mount Checkout. Return the client_secret in your response.
router.post('/create-checkout-session', async (req, res) => {
  try {
    // console.log("body:", req.body.sessionData);
    // console.log("headers:", req.headers)
      
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      payment_method_types: ['card'],
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      metadata: req.body.sessionData,
      mode: 'payment',
      return_url: `${domain}/return?session_id={CHECKOUT_SESSION_ID}`,
    });
  
    res.json({ clientSecret: session.client_secret });
  } catch (error) {
    // console.error('Stripe Checkout Error:', error);
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

router.get('/session-complete-webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    // console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Retrieve the Payment Intent
    const paymentIntentId = session.payment_intent;
    if (paymentIntentId) {
      try {
        // Update the Payment Intent metadata
        await stripe.paymentIntents.update(paymentIntentId, {
          metadata: session.metadata, // Transfer metadata from checkout session
        });

        console.log('Metadata transferred to Payment Intent:', session.metadata);
      } catch (error) {
        console.error('Error updating Payment Intent metadata:', error);
      }
    }
  }

  res.sendStatus(200);

})


module.exports = router;