const mongoose = require("mongoose");

const tokenWhitelistSchema = new mongoose.Schema({
  token: { type: String, required: true },
  // email: { type: String, required: true }, 
  role: { type: String, enum: ["buyer", "seller", "admin"], required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
  },
  createdAt: { type: Date, default: Date.now, expires: "7d" },
});

module.exports = mongoose.model("TokenWhitelist", tokenWhitelistSchema);
