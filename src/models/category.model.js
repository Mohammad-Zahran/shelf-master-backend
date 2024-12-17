import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
