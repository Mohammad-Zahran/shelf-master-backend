import { FaCartShopping } from "react-icons/fa6";
import { User } from "../models/user.model.js";

// Add to Cart
export const addToCart = async (req, res) => {
  const { email, productId, name, images, price, quantity } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const existingCartItem = user.cart.find(
      (item) => item.productId === productId
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      user.cart.push({ productId, name, images, price, quantity });
    }

    await user.save();

    res
      .status(200)
      .json({ message: "Item added to cart successfully!", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Cart
export const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCart = await User.findByIdAndDelete(cartId);
    if (!deletedCart) {
      return res.status(401).json({ message: "Cart Items not found!" });
    }
    res.status(200).json({ message: "Cart Item deleted Succesfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
