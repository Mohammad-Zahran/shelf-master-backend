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
        minlength: 3
    },
    image: String,
    price: Number,
    quantity: Number
})