const mongoose = require('mongoose');
require('dotenv').config();
const Buyer = require('../models/Buyer');
const Seller = require('../models/Seller');
const Admin = require('../models/Admin');
// const Product = require('../models/Product');
// const Category = require('../models/Category');
// const Wishlist = require('../models/Wishlist');
// const CartItem = require('../models/CartItem');
// const ProductImage = require('../models/ProductImage');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'Ecommerce', // 👈 Set the DB name explicitly
    });

    console.log('MongoDB connected');

    // Create initial collections by initializing models
    await Promise.all([
      Buyer.init(),
      Seller.init(),
      Admin.init(),
      // Product.init(),
      // Category.init(),
      // Wishlist.init(),
      // CartItem.init(),
      // ProductImage.init(),
    ]);

    console.log('Collections initialized');
  } catch (error) {
    console.error('Mongo connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;