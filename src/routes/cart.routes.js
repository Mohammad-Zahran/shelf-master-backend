import { Router } from "express";

import {
    addToCart,
} from './../controllers/cart.controller.js';

const router = new Router();

router.post("/", addToCart);

export default router;