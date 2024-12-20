import { Router } from "express";
import {
  addTestimonial,
  getTestimonials,
  getAllTestimonials,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonial.controller.js";

const router = new Router();

router.post("/", addTestimonial);
router.get("/", getTestimonials);
router.get("/all", getAllTestimonials);
router.put("/:email/:testimonialId", updateTestimonial);
router.delete("/:email/:testimonialId", deleteTestimonial);

export default router;
