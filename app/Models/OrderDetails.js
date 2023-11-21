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
    // note: {
    //   type: String
    // },
    price: {
      type: Number,
      default: 0
    },
    quantity: {
      type: Number,
      default: 1
    },
    total_price: {
      type: Number,
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

orderDetailsSchema.virtual('product', {
  ref: 'Product',
  foreignField: '_id',
  localField: 'product_id',
  justOne: true,
});

orderDetailsSchema.virtual('orderDetailClassifyValues', {
  ref: 'OrderDetailClassifyValues',
  foreignField: 'orderDatail_id',
  localField: '_id',
  // justOne: true,
});

export default mongoose.model('OrderDetails', orderDetailsSchema, 'orderDetails')