import { Router } from "express";

import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { Payment } from "../models/payment.model.js";

// middleware
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

// get all orders, users, payments, products item lengths

const router = new Router();

router.get('/', async(req, res) => {
    res.send("Hello, Admin");
});

export default router;

