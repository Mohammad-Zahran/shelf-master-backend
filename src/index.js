import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";

import jwt from "jsonwebtoken";

import nodemailer from "nodemailer";

const app = express();

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@shelf-master-cluster.kfdar.mongodb.net/shelf-master?retryWrites=true&w=majority&appName=shelf-master-cluster"`
  )
  .then(console.log("MongoDB connected Succesfully!"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/carts", cartRoutes);
app.use("/reviews", reviewRoutes);
app.use("/category", categoryRoutes);
app.use("/payments", paymentRoutes);
app.use("/wishlists", wishlistRoutes);
app.use("/testimonials", testimonialRoutes);

app.get("/", (req, res) => {
  res.send("Hello Shelf Client Server!");
});

app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 587, // Use 465 if you set `secure: true`
//   secure: false, // true for port 465, false for port 587
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

//
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch 👻" <zahranmohammad30@gmail.com>', // sender address
//     to: "mohammadalzahrann@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);
