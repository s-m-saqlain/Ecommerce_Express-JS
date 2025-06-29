const mongoose = require('mongoose');

const productImageSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  images: [{ type: String }], // array of image URLs or paths
});

module.exports = mongoose.model('ProductImage', productImageSchema);