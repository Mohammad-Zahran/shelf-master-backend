import { Payment } from "../models/payment.model.js";
import { User } from "../models/user.model.js";
import { Product } from "../models/product.model.js";

export const createPayment = async (req, res) => {
  const paymentData = req.body;

  try {
    const user = await User.findOne({ email: paymentData.email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Process product items and update stock
    for (const item of paymentData.productItems) {
      console.log("Processing product item:", item);

      // Find the product by ID
      const product = await Product.findById(item.productId);
      if (!product) {
        console.error(`Product not found: ${item.productId}`);
        return res.status(404).json({
          message: `Product with ID ${item.productId} not found.`,
        });
      }

      // Check if enough stock is available
      if (product.stock < item.quantity) {
        console.error(
          `Insufficient stock for product: ${product.name} (ID: ${item.productId})`
        );
        return res.status(400).json({
          message: `Insufficient stock for product: ${product.name}`,
        });
      }

      // Update the stock
      product.stock -= item.quantity;
      console.log(
        `Updated stock for product ${product.name}: ${product.stock}`
      );
      await product.save();
    }

    // Record the payment
    const newPayment = await Payment.create(paymentData);

    // Clear the user's cart
    user.cart = [];
    await user.save();

    res.status(200).json({
      message:
        "Payment recorded, cart cleared, and stock updated successfully.",
      payment: newPayment,
    });
  } catch (error) {
    console.error("Error in createPayment:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};

// Get payments for a user
export const getUserPayments = async (req, res) => {
  const email = req.query.email;
  const query = { email: email };

  try {
    const decodedEmail = req.decoded.email;
    if (email !== decodedEmail) {
      res.status(403).json({ message: "Forbidden Access" });
    }
    const result = await Payment.find(query).sort({ createdAt: -1 }).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get all payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find({}).sort({ createdAt: -1 }).exec();
    res.status(200).json(payments);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// confirm payments status
export const confirmPayment = async (req, res) => {
  const payId = req.params.id;
  const { status } = req.body;
  try {
    const updatedStatus = await Payment.findByIdAndUpdate(
      payId,
      { status: "confirmed" },
      { new: true, runValidators: true }
    );

    if (!updatedStatus) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.status(200).json(updatedStatus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// deletePayment
export const deletePayment = async (req, res) => {
  const payId = req.params.id;
  try {
    const deletedPayment = await Payment.findByIdAndDelete(payId);
    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
