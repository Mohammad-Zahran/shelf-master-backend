import {Router} from "express";

import {
    addReview,
    getReviews,
    updateReview,
    deleteReview,
} from "../controllers/review.controller.js"

const router = new Router();

router.post('/', addReview);
router.get('/:id',getReviews);
router.patch("/:productId/:reviewId", updateReview);
router.delete("/:productId/:reviewId", deleteReview);



export default router;