import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  userId: String,
  userName: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  description: String,
  images: {
    type: [String],
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: "A product must have at least one image.",
    },
  },
  category: {
    type: String,
    enum: ["Heavy-Duty", "Adjustable", "Wall-Mounted", "Freestanding"],
    required: true,
  },
  dimensions: {
    height: Number,
    width: Number,
    depth: Number,
  },
  material: String,
  loadCapacity: Number,
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  reviews: [reviewSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Product = model("Product", productSchema);
