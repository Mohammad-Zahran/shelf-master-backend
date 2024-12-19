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

// Delete Cart Item by cartId
export const deleteCart = async (req, res) => {
  const { email } = req.body;
  const { id: cartId } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const cartIndex = user.cart.findIndex(
      (item) => item._id.toString() === cartId
    );

    if (cartIndex === -1) {
      return res.status(404).json({ message: "Cart item not found!" });
    }

    user.cart.splice(cartIndex, 1);

    await user.save();

    res
      .status(200)
      .json({ message: "Cart item deleted successfully!", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update Cart
export const updateCart = async (req, res) => {
  const { id: cartId } = req.params;
  const { email, productId, name, images, price, quantity } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email, "cart._id": cartId },
      {
        $set: {
          "cart.$.productId": productId,
          "cart.$.name": name,
          "cart.$.images": images,
          "cart.$.price": price,
          "cart.$.quantity": quantity,
        },
      },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Cart item not found!" });
    }

    res.status(200).json({
      message: "Cart item updated successfully!",
      cart: user.cart,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Cart Item
export const getSingleCart = async (req, res) => {
  const { email } = req.body;
  const { id: cartId } = req.params;

  try {
    const user = await User.findOne(
      { email, "cart._id": cartId },
      { "cart.$": 1 }
    );

    if (!user || !user.cart || user.cart.length === 0) {
      return res.status(404).json({ message: "Cart item not found!" });
    }

    res.status(200).json({ cart: user.cart[0] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
