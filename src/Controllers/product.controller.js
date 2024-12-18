import { Product } from "../models/product.model.js";

// post a new product item
export const postProductItem = async (req, res) => {
  const newItem = req.body;
  try {
    const result = await Product.create(newItem);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get all productItems
export const getAllMenuItems = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
