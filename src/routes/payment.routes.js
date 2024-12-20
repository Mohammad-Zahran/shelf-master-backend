import { Router } from "express";
import { createPayment } from "../controllers/payment.controller.js";

const router = new Router();

router.post("/", createPayment);

export default router;
