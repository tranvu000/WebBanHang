import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const brandSchema = new mongoose.Schema (
  {
    name: {
      type: String,
      require: true
    },
    description: {
      type: String,
    },
    logo: {
      type: String,
      get: (value) => {
        return process.env.DOMAIN + '/product/logo/' + value
      }
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

export default mongoose.model('Brand', brandSchema, 'brands')