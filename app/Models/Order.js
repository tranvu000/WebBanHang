import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      required: true,
      ref: 'User'
    },
    note: {
      type: String,
    },
    status: {
      type: number,
      required: true,
      default: 1
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
    }
  },
  {
    toJSON: {
      getters: true,
      virtuals: true
    },
    toObject: {
      virtuals: true
    },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    id: false,
    versionKey: false
  }
);

orderSchema.virtual('user', {
  ref: 'User',
  foreignField: '_id',
  localField: 'user_id'
});

export default mongoose.model('Order', orderSchema, 'order');