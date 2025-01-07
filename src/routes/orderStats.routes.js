import { Router } from "express";

import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";
import { Payment } from "../models/payment.model.js";

// middleware
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const result = await Payment.aggregate([
      {
        $unwind: "$productItems",
      },
      {
        $lookup: {
          from: "products",
          localField: "productItems",
          foreignField: "_id",
          as: "productItemsDetails",
        },
      },
      {
        $unwind: "$productItemsDetails",
      },
      {
        $group: {
          _id: "$productItemsDetails.category",
          quantity: { $sum: "$quantity" },
          revenue: { $sum: "$price" },
        },
      },
      {
        $project: {
          _id: 0,
          category: "$_id",
          quantity: "$quantity",
          revenue: "$revenue",
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    res.statsu(500).send("Internal Server Error: " + error.message);
  }
});

export default router;
