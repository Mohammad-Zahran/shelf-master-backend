import { Router } from "express";
import { verifyToken } from './../middleware/verifyToken.js';

import {
  createPayment,
  getUserPayments,
} from "../controllers/payment.controller.js";

const router = new Router();

router.post("/", createPayment);
router.get("/", verifyToken, getUserPayments);

export default router;
