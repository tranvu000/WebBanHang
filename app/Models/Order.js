import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { ORDER_STATUS } from "../config/constants.js";

const orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      required: true,
      ref: 'User'
    },
    // note: {
    //   type: String,
    // },
    total_price: {
      type: Number,
      require: true,
      default: 0
    },
    total_product: {
      type: Number,
      require: true,
      default: 0
    },
    status: {
      type: Number,
      enum: Object.values(ORDER_STATUS),
      required: true,
      default: 0
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

orderSchema.virtual('order_details', {
  ref: 'OrderDetails',
  localField: '_id',
  foreignField: 'order_id'
});

export default mongoose.model('Order', orderSchema, 'order');