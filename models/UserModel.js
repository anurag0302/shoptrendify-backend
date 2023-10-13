const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zipCode: {
    type: String,
  },
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  orderDate: Date,
  status: {
    type: String,
    enum: ["processing", "shipped", "delivered", "canceled"],
    default: "processing",
  },
});
const wishlistItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  addedAt: {
    type: Date,
    default: Date.now,
  },
});
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone_number: { type: String, required: true },
  password: { type: String, required: true },
  verified: { type: String, required: true },
  addresses: [addressSchema], // Array of addresses
  defaultAddress: { type: Number },
  orders: [orderSchema],
  wishlists: [
    {
      name: String, // Name of the wishlist, e.g., "My Birthday Wishlist"
      items: [wishlistItemSchema], // Array of wishlist items
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
