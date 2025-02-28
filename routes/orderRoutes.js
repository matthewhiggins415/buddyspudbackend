const express = require('express');
const Order = require('../models/orderModel');
const passport = require('passport');

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router();

// create an order
router.post('/order', async (req, res, next) => {
  console.log(req.body)
    
  try {
    let newOrder = await Order.create(req.body.order)
    res.status(201).json({ order: newOrder })
  } catch(e) {
    res.status(500).json({ msg: 'Error creating order'})
  }
});

// get all order
router.get('/orders', requireToken, async (req, res, next) => {
  try {
    let orders = await Order.find();
    res.json({ orders: orders })
  } catch(e) {
    res.json({ msg: 'something went wrong'})
  }
})
  
// get an order
router.get('/orders/:id', requireToken, async (req, res, next) => {
  const id = req.params.id
  try {
    const order = await Order.findById(id);
    res.status(200).json({ order: order });
  } catch(err) {
    console.log(err);
    res.json({ msg: 'something went wrong'});
  }   
})

// update an order as sent
// router.put('/order/sent/:id', requireToken, async (req, res, next) => {
//   const id = req.params.id;
  
//   try {
//     let order = await Order.findById(id);
//     order.isSent = true;
//     let updatedOrder = await order.save();
  
//     res.status(201).json({ updatedOrder: updatedOrder })
//   } catch(e) {
//     res.json({ msg: 'something went wrong'})
//   }
// })

// delete an order

module.exports = router;