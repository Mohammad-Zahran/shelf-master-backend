import { Router } from "express";
import {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
  getAverageRating,
  getReview,
} from "../controllers/review.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = new Router();

// Secure the routes requiring authentication with verifyToken
router.post("/:productId", addReview);
router.get("/:id", getReviews);
router.get("/:productId/:reviewId", getReview);
router.get("/products/:id/average-rating", getAverageRating);
router.patch("/:productId/:reviewId", verifyToken, updateReview);
router.delete("/:productId/:reviewId", verifyToken, deleteReview);

export default router;
