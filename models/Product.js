const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller' },
});

module.exports = mongoose.model('Product', productSchema);