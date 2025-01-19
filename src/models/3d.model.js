import { Schema, model } from "mongoose";

const model3DSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  photo: {
    type: String,
    required: true,
  },
  model3D: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Model3D = model("Model3D", model3DSchema);
