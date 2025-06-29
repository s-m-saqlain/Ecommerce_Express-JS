const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  role: { type: String, enum: ['admin', 'seller', 'buyer'], required: true },
  createdAt: { type: Date, default: Date.now, expires: '7d' } // auto-delete after 7 days
});

module.exports = mongoose.model('TokenWhitelist', tokenSchema);