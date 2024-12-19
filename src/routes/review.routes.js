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
router.patch("/:productId/:reviewId", updateReview);
router.delete("/:productId/:reviewId", deleteReview);
router.get("/:id/average-rating", getAverageRating);



export default router;