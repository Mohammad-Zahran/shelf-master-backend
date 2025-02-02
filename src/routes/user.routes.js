import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

import {
  register,
  getAllUsers,
  deleteUser,
  getAdmin,
  makeAdmin,
  updateProfile,
} from "../Controllers/user.controller.js";

const router = new Router();

router.post("/", register);
// router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);
router.get("/admin/:email", verifyToken, getAdmin);
router.patch("/admin/:id", verifyToken, verifyAdmin, makeAdmin);
router.put("/", updateProfile);

export default router;
