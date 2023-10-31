import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const classifyValueSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      require: true
    },
    image: {
      type: String,
      require: true,
      get: (value) => {
        return process.env.DOMAIN + value
      }
    },
    classify_id: {
      type: ObjectId,
      require: true,
      ref: 'Classify'
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
  }
);

export default mongoose.model('ClassifyValue', classifyValueSchema, 'classifyValue')