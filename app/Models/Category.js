import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    image: {
      type: String,
      default: 'category/image/default_category.png',
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
    toJSON: {
      getters: true
    },
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    id: false
  }
);

export default mongoose.model("Category", categorySchema, "categories")