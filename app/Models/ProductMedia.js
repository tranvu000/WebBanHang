import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const productMediaSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      require: true,
      get: (value) => {
        return process.env.DOMAIN + value;
      }
    },
    type: {
      type: Number,
      require: true,
      default: 0
    },
    product_id: {
      type: ObjectId,
      require: true,
      ref: 'Product',
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
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

export default mongoose.model('ProductMedia', productMediaSchema, 'productMedia')