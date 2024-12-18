import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

import {
    register,
} from "../controllers/user.controller.js";

const router = new Router();

router.post('/', register);

export default router;
