import { Router } from "express";

import {
    addToCart,
} from './../controllers/cart.controller';

const router = new Router();

router.post("/", addToCart);
