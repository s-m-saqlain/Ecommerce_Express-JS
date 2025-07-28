const mongoose = require('mongoose');
require('dotenv').config();
const models = [
  require('../models/Admin'),
  require('../models/Buyer'),
  require('../models/Seller'),
  require('../models/TokenWhitelist'),
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'Ecommerce',
    });
    console.log('MongoDB connected');
    await Promise.all(models.map(Model => Model.init()));
    console.log('Collections initialized');
  } catch (error) {
    console.error('Mongo connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;