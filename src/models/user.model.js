import { Schema, model } from "mongoose";

// Cart Item Schema:
const cartItemSchema = new Schema({
  productId: String,
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  images: [String], 
  price: Number,
  quantity: Number,
});

cartItemSchema.virtual("firstImage").get(function () {
  return this.images && this.images.length > 0 ? this.images[0] : null;
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

// Testimonial Item Schema
const testimonialSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
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
  orders: [orderItemSchema],
  testimonials: [testimonialSchema],
});

export const User = model("User", userSchema);