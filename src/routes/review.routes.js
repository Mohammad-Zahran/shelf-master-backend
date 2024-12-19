import {Router} from "express";

import {
    addReview,
    getReviews,
    updateReview,
} from "../controllers/review.controller.js"

const router = new Router();

router.post('/', addReview);
router.get('/:id',getReviews);
router.patch("/:productId/:reviewId", updateReview);



export default router;