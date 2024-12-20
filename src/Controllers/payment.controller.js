import { Payment } from "../models/payment.model.js";
import { User } from "../models/user.model.js";

// post payment to inform to db
export const createPayment = async (req, res) => {
  const paymentData = req.body;

  try {
    const user = await User.findOne({ email: paymentData.email });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newPayment = await Payment.create(paymentData);

    user.cart = [];
    await user.save();

    res.status(200).json({
      message: "Payment recorded and cart cleared successfully.",
      payment: newPayment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred.", error: error.message });
  }
};
