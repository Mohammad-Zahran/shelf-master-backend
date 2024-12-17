// User Model:
import mongoose from "mongoose";
import { Schema } from "mongoose";

// Cart Item Schema:
const cartItemSchema = new Schema({
  productId: String,
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  image: String,
  price: Number,
  quantity: Number,
});

// Wishlist Item Schema:
const wishlistItemSchema = new Schema({
  productId: String,
  name: String,
  image: String,
  price: Number,
  addedAt: {
    type: Date,
    default: Date.now,
  },
});

// Order Schema:
const orderItemSchema = new Schema({
  productId: String,
  name: String,
  price: Number,
  quantity: Number,
});

// User Schema:
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  photoURL: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  cart: [cartItemSchema],
  wishlist: [wishlistItemSchema],
  orders: [orderItemSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;