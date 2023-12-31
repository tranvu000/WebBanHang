import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const shoppingCartSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      required: true,
      ref: 'User'
    },
    product_id: {
      type: ObjectId,
      required: true,
      ref: 'Product'
    },
    quantity: {
      type: Number,
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

shoppingCartSchema.virtual('user', {
  ref: 'User',
  foreignField: '_id',
  localField: 'user_id'
});

shoppingCartSchema.virtual('product', {
  ref: 'Product',
  foreignField: '_id',
  localField: 'product_id'
});

shoppingCartSchema.virtual('shoppingCartClassifyValues', {
  ref: 'ShoppingCartClassifyValues',
  foreignField: 'shoppingCart_id',
  localField: '_id'
});

export default mongoose.model('ShoppingCart', shoppingCartSchema, 'shoppingCart');