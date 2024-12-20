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

// Get all wishlist items
export const getWishListItems = async (req, res) => {
  const email = req.query.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove an item from the wishlist based on productId and wishlistId
export const removeWishlistItem = async (req, res) => {
  const { email } = req.body;
  const { id: wishlistId } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const wishListIndex = user.wishlist.findIndex(
      (item) => item._id.toString() === wishlistId
    );

    if (wishListIndex === -1) {
      return res.status(404).json({ message: "WishList item not found!" });
    }

    user.wishlist.splice(wishListIndex, 1);

    await user.save();

    res
      .status(200)
      .json({
        message: "WishList item deleted successfully!",
        wishlist: user.wishlist,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
