import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

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
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@shelf-master-cluster.kfdar.mongodb.net/?retryWrites=true&w=majority&appName=shelf-master-cluster"`
  )
  .then(console.log("MongoDB connected Succesfully!"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server running on port ${process.env.SERVER_PORT}`);
});
