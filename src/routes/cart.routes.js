import { Router } from "express";

import {
    addToCart,
    deleteCart,
} from './../controllers/cart.controller.js';

const router = new Router();

router.post("/", addToCart);
router.delete('/:id', deleteCart)


export default router;