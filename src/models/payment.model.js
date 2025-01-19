import { Schema, model } from "mongoose";

const paymentSchema = new Schema({
  transitionId: String,
  email: String,
  price: Number,
  quantity: Number,
  status: String,
  itemName: Array,
  cartItems: Array,
  productItems: Array,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Payment = model("Payment", paymentSchema);
