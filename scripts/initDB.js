const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');
const Buyer = require('../models/Buyer');
const Seller = require('../models/Seller');
const Product = require('../models/Product');
const Category = require('../models/Category');
const Wishlist = require('../models/Wishlist');

const initDB = async () => {
  try {
    await connectDB();

    // Register models to ensure collections are created
    await Admin.createCollection();
    await Buyer.createCollection();
    await Seller.createCollection();
    await Product.createCollection();
    await Category.createCollection();
    await Wishlist.createCollection();

    console.log('Collections initialized in Ecommerce database');
    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error.message);
    process.exit(1);
  }
};

initDB();