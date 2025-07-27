const mongoose = require("mongoose");

const tokenWhitelistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  role: { type: String, required: true, enum: ["buyer", "seller", "admin"] },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: "7d" }, // Tokens expire after 7 days
});

module.exports = mongoose.model("TokenWhitelist", tokenWhitelistSchema);