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
export const getAllProducItems = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a product item
export const deleteProductItem = async (req, res) => {
  const productId = req.params.id;
  try {
    const deletedItem = await Product.findByIdAndDelete(productId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product Item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
