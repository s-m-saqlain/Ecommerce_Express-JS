const mongoose = require('mongoose');

const tokenWhitelistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User ID is required'],
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: {
      values: ['buyer', 'seller', 'admin'],
      message: 'Role must be buyer, seller, or admin',
    },
  },
  token: {
    type: String,
    required: [true, 'Token is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '7d', // Tokens expire after 7 days
  },
});

module.exports = mongoose.model('TokenWhitelist', tokenWhitelistSchema);