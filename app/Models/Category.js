import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    description: {
      type: String,
    },
    created_by: {
      type: ObjectId
    },
    updated_by: {
      type: ObjectId
    },
    created_at: {
      type: Date
    },
    updated_at: {
      type: Date
    },
    deleted_at: {
      type: Date
    }
  },

  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

export default mongoose.model("Category", categorySchema, "categories")