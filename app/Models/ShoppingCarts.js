import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

const shoppingCartsSchema = new mongoose.Schema(
  {
    user_id: {
      type: ObjectId,
      require: true,
      ref: 'User'
    },
    product_id: {
      type: ObjectId,
      require: true,
      ref: 'Product'
    },
    quantity: {
      type: Number,
      require: true
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

shoppingCartsSchema.virtual('user', {
  ref: 'User',
  foreignField: '_id',
  localField: 'user_id'
});

shoppingCartsSchema.virtual('product', {
  ref: 'Product',
  foreignField: '_id',
  localField: 'product_id'
});

export default mongoose.model('ShoppingCarts', shoppingCartsSchema, 'shoppingCarts');