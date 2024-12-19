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
