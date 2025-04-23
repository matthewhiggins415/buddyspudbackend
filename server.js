const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const color = require('colors');
const dotenv = require("dotenv");
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
dotenv.config();
const userRoutes = require('./routes/userRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const stripeRoutes = require('./routes/stripeRoutes.js');
const auth = require('./lib/auth.js');

const app = express();

// connect to db
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}`);
    
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
  } catch(error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
}
  
connectDB();

// app.use(cors({
//   origin: true
// }))

// app.use(cors());

app.use(cors({ origin: ['https://buddyspud.com', 'http://localhost:3000', 'https://stripe.com'] }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://buddyspud.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Add this middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("working okay")
})

// Routes
app.use(auth);
app.use(orderRoutes);
app.use(userRoutes);
app.use(stripeRoutes);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`.blue.bold));