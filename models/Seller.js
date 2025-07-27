const mongoose = require('mongoose');

const sellerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  otp: {
    hash: { type: String }, // Hashed OTP
    createdAt: { type: Date }, // OTP creation time
    isVerified: { type: Boolean, default: false }, // OTP verification status
    wrongAttempts: { type: Number, default: 0 }, // Number of wrong OTP attempts
  },
});

module.exports = mongoose.model('Seller', sellerSchema);