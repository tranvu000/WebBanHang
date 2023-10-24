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
    update_by: {
      type: ObjectId
    },
    created_at: {
      type: Date
    },
    update_at: {
      type: Date
    },
    deleted_at: {
      type: Date
    }
  },

  {
    timestamps: {
      createdAt: 'created_at',
      updateAt: 'update_at'
    }
  }
);

export default mongoose.model("Category", categorySchema, "categories")