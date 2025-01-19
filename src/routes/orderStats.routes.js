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
        $unwind: "$productItems", // Deconstruct the productItems array
      },
      {
        $addFields: {
          productIdAsObjectId: {
            $convert: {
              input: "$productItems.productId", // Extract productId from the nested object
              to: "objectId", // Convert it to ObjectId
              onError: null, // Handle invalid conversions
              onNull: null, // Handle null values
            },
          },
        },
      },
      {
        $lookup: {
          from: "products", // The products collection
          localField: "productIdAsObjectId", // Match the converted productId
          foreignField: "_id", // Match against the _id field in Product
          as: "productDetails",
        },
      },
      {
        $unwind: {
          path: "$productDetails", // Unwind the matched product details
          preserveNullAndEmptyArrays: false, // Skip unmatched entries
        },
      },
      {
        $group: {
          _id: "$productDetails.category", // Group by product category
          quantity: { $sum: "$productItems.quantity" }, // Sum quantities from productItems
          revenue: {
            $sum: {
              $multiply: ["$productDetails.price", "$productItems.quantity"],
            },
          }, // Calculate revenue
        },
      },
      {
        $project: {
          _id: 0, // Exclude the default _id field
          category: "$_id", // Rename the grouped category
          quantity: 1, // Include quantity in the result
          revenue: 1, // Include revenue in the result
        },
      },
    ]);
    res.json(result);
  } catch (error) {
    res.status(500).send("Internal Server Error: " + error.message);
  }
});

export default router;
