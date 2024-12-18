import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

import {
    register,
    getAllUsers,
} from "../controllers/user.controller.js";

const router = new Router();

router.post('/', register);
router.get('/',verifyToken, verifyAdmin, getAllUsers);


export default router;
