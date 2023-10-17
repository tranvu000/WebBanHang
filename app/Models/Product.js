import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  prices: {
    type: String,
    require: true,
  },
  discount: {
    type: String,
  },
});

export default productSchema;
