import { number } from "joi";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    phone: {
      type: String,
      require: true
    },
    password: {
      type: String,
      require: true
    },
    level: {
      type: number,
      require: true,
      default: 1
    },
    avartar: {
      type: String,
    },
  }
);

export default mongoose.model('User', userSchema, 'users')