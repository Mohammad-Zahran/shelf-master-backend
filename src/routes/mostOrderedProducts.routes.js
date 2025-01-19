import { Router } from "express";
import { Payment } from "../models/payment.model.js";

const router = new Router();

router.get("/", async (req, res) => {
  try {
    const result = await Payment.aggregate([
      { $unwind: "$productItems" }, // Deconstruct productItems array
      {
        $group: {
          _id: "$productItems.productId", // Group by productId
          name: { $first: "$itemName" }, // Take the first name
          quantity: { $sum: "$productItems.quantity" }, // Sum quantities
        },
      },
      { $sort: { quantity: -1 } }, // Sort by quantity in descending order
      { $limit: 10 }, // Limit to top 10 products
    ]);

    res.status(200).json(result);
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

export default router;
