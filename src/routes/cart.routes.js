import { Router } from "express";

import {
    addToCart,
    deleteCart,
    updateCart,
} from './../controllers/cart.controller.js';

const router = new Router();

router.post("/", addToCart);
router.delete('/:id', deleteCart)
router.put('/:id', updateCart)


export default router;