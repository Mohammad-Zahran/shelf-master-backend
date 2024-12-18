import { Router } from "express";

import {
    postProductItem,
} from "../controllers/product.controller.js";

router.post('/', postProductItem);
