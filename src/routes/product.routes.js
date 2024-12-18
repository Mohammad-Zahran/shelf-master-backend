import { Router } from "express";

import {
    postProductItem,
} from "../controllers/product.controller.js";

const router = new Router();

router.post('/', postProductItem);

export default router;