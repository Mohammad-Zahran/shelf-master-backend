import { User } from "../models/user.model.js";

export const addToCart = async (req, res) => {
  const { email, productId, name, image, price, quantity } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingCartItem = user.cart.find(
      (item) => item.productId === productId
    );

    if (existingCartItem) {
      existingCartItem.quantity += quantity;
    } else {
      user.cart.push({ productId, name, image, price, quantity });
    }

    const updatedUser = await user.save();

    res.status(200).json(updatedUser.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
