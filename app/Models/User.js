import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: 1,
    },
    birthday: {
      type: Date,
    },
    level: {
      type: Number,
      required: true,
      default: 1,
    },
    address: {
      type: String,
    },
    avartar: {
      type: String,
      get: (value) => {
        return process.env.DOMAIN + '/user/avatar/' + value;
      }
    },
    created_by: {
      type: ObjectId,
    },
    update_by: {
      type: ObjectId,
    },
    created_at: {
      type: Date,
      timestamps: true,
    },
    update_at: {
      type: Date,
      timestamps: true,
    },
    deleted_at: {
      type: Date,
    },
  },

  {
    toJSON: {
      getters: true,
    },
    timestamps: {
      createdAt: "created_at",
      updateAt: "update_at",
    },
  }
);

export default mongoose.model("User", userSchema, "users");
