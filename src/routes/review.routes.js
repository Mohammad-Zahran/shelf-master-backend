import {Router} from "express";

import {
    addReview,
} from "../controllers/review.controller.js"

const router = new Router();

router.post('/', addReview);

export default router;