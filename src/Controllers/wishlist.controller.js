import { User } from "../models/user.model.js";

// Add an item to the wishlist
export const addWishlistItem = async (req, res) => {
  const { email, product } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.wishlist.push(product);
    await user.save();

    res.status(200).json({ message: "Product added to wishlist", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
