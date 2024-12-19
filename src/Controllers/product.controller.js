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

// get single product item
export const singleProductItem = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findById(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update single product item
export const updateProductItem = async (req, res) => {
    const productId = req.params.id; 
    const { 
        name, 
        description, 
        images, 
        category, 
        dimensions, 
        material, 
        loadCapacity, 
        price, 
        stock 
    } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            productId, // The ID of the product to update
            { 
                name, 
                description, 
                images, 
                category, 
                dimensions, 
                material, 
                loadCapacity, 
                price, 
                stock 
            },
            { new: true, runValidators: true } 
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(updatedProduct); // Respond with the updated product
    } catch (error) {
        res.status(500).json({ message: error.message }); // Handle errors
    }
};
