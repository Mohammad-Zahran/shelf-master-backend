import { Router } from "express";

import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { Payment } from "../models/payment.model.js";

// middleware
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";


const router = new Router();

router.get('/', async (req, res) => {
    res.send("Order Status: ");
})


export default router;
