import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const verifySchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Number,
      required: true,
    },
    created_by: {
      type: ObjectId,
    },
    updated_by: {
      type: ObjectId,
    },
    created_at: {
      type: Date,
      timestamps: true,
    },
    updated_at: {
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
      virtuals: true,
    },
    toObject: {
      getters: true,
      virtuals: true,
    },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    id: false
  }
);

export default mongoose.model("Verify", verifySchema, "verify");

