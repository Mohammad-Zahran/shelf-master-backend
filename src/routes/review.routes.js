import {Router} from "express";

import {
    addReview,
    getReviews,
} from "../controllers/review.controller.js"

const router = new Router();

router.post('/', addReview);
router.get('/:id',getReviews);

export default router;