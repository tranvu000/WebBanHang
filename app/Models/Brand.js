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
        return process.env.DOMAIN + '/brand/logo/' + value
      },
      default: "default_logo.png",
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
    },
    id: false
  }
);

export default mongoose.model('Brand', brandSchema, 'brands');