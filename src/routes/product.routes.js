import { Router } from "express";

import {
    postProductItem,
    getAllProducItems,
} from "../controllers/product.controller.js";

const router = new Router();

router.post('/', postProductItem);
router.get('/', getAllProducItems )


export default router;