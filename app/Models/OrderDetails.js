import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const orderDetailsSchema = new mongoose.Schema(
  {
    order_id: {
      type: ObjectId,
      required: true,
      ref: 'Order'
    },
    product_id: {
      type: ObjectId,
      required: true,
      ref: 'Product'
    },
    note: {
      type: String
    },
    quantity: {
      type: Number,
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

orderDetailsSchema.virtual('order', {
  ref: 'Order',
  foreignField: '_id',
  localField: 'order_id'
});

orderDetailsSchema.virtual('product', {
  ref: 'Product',
  foreignField: '_id',
  localField: 'product_id'
});

export default mongoose.model('OrderDetails', orderDetailsSchema, 'orderDetails')