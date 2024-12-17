import mongoose from "mongoose";
import { Schema } from "mongoose";

// Review Schema:
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
        default: Date.now
    },
});