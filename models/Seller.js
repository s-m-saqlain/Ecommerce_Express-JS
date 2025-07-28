const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  otp: {
    hash: {
      type: String,
    },
    createdAt: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verifyTime: {
      type: Date,
    },
    wrongAttempts: {
      type: Number,
      default: 0,
      max: [3, 'Maximum OTP attempts exceeded'],
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Seller', sellerSchema);