import { Router } from "express";

import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { Payment } from "../models/payment.model.js";

// middleware
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";
import { Model3D } from "../models/3d.model.js";

// get all orders, users, payments, products item lengths

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.countDocuments();
    const shelfItems = await Product.countDocuments();
    const orders = await Payment.countDocuments();
    const models = await Model3D.countDocuments();
    const testimonials = await User.aggregate([
      { $unwind: "$testimonials" },
      { $count: "totalTestimonials" },
    ]);

    const result = await Payment.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$price",
          },
        },
      },
    ]);
    const revenue = result.length > 0 ? result[0].totalRevenue : 0;
    const testimonialCount =
      testimonials.length > 0 ? testimonials[0].totalTestimonials : 0;

    res.status(200).json({
      users,
      shelfItems,
      orders,
      revenue,
      testimonialCount,
      models,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

export default router;
