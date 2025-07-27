const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  cart: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 1 },
    },
  ],
  otp: {
    hash: { type: String }, // Hashed OTP
    createdAt: { type: Date }, // OTP creation time
    isVerified: { type: Boolean, default: false }, // OTP verification status
    verifyTime: { type: Date }, // <-- add this if not already present
    wrongAttempts: { type: Number, default: 0 }, // Number of wrong OTP attempts
  },
});

module.exports = mongoose.model('Buyer', buyerSchema);