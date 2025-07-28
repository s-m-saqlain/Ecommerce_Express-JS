const mongoose = require('mongoose');
const connectDB = require('../config/db');
const models = [
  require('../models/Admin'),
  require('../models/Buyer'),
  require('../models/Seller'),
  require('../models/TokenWhitelist'),
];

const initDB = async () => {
  try {
    await connectDB();
    await Promise.all(models.map(Model => Model.createCollection()));
    console.log('Collections initialized in Ecommerce database');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error.message);
    process.exit(1);
  }
};

initDB();