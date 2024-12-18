import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js"
import productRoutes from "./routes/product.routes.js"
import jwt from "jsonwebtoken";

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

  app.use('/users', userRoutes);
  app.use('/products', productRoutes);

  app.get('/', (req, res) => {
    res.send('Hello Foodi Client Server!')
  })

  app.post('/jwt', async(req,res) => {
    const user = req.body;
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: '1hr'
    });
    res.send({token})
  })

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
