const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  brand: String,
  gender: String,
  category: String,
  price: Number,
  is_in_inventory: Boolean,
  items_left: Number,
  discountPercent: Number,
  description: String,
  imageURL: String,
  slug: String,
  reviews: [
    {
      userId: String,
      userName: String,
      rating: Number,
      comment: String,
      date: Date,
    },
  ],
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;