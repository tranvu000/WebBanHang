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
        return process.env.DOMAIN + '/user/logo/' + value
      }
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
    toJSON: {
      getters: true
    },

    timestamps: {
      createdAt: "created_at",
      updateAt: "update_at"
    }
  }
);

export default mongoose.model('Brand', brandSchema, 'brands')