import {Router} from "express";

import {
    addReview,
    getReviews,
    updateReview,
    deleteReview,
    getAverageRating,
} from "../controllers/review.controller.js"

const router = new Router();

router.post('/', addReview);
router.get('/:id',getReviews);
router.get("/:id/average-rating", getAverageRating);
router.patch("/:productId/:reviewId", updateReview);
router.delete("/:productId/:reviewId", deleteReview);



export default router;