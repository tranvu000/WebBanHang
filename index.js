import express from "express";
import dotenv from "dotenv";
import router from "./router/index.js";
import mongoose from "mongoose";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    autoIndex: true,
  })
  .then(() => {
    console.log("Connected");
  });

const app = express();

app.use(express.json());
app.use(express.static("storage"));

router(app)

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log("Server listrning on port: " + PORT);
});
