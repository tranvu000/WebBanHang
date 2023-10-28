import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: {
      type: String,
      require: true,
    },
    discount: {
      type: String,
    },
    category_id: {
      type: ObjectId,
      require: true,
      ref: 'Category'
    },
    brand_id: {
      type: ObjectId,
      require: true,
      ref: 'Brand'
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
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true //mặc định virtuals: false
    },
    toObject: {
      virtuals: true,
    },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    },
    id: false, // ẩn tạo id mới, id = _id của từng table
    versionKey: false //nhằm lược bỏ "__v": trong DB
  }
);

productSchema.virtual('category', {
  ref: 'Category',
  foreignField: '_id',
  localField: 'category_id'
});

productSchema.virtual('brand', {
  ref: 'Brand',
  foreignField: '_id',
  localField: 'brand_id'
});

productSchema.virtual('productMedia', {
  ref: 'ProductMedia',
  foreignField: 'product_id',
  localField: '_id'
});

productSchema.virtual('classifies', {
  ref: 'Classify',
  foreignField: 'product_id',
  localField: '_id'
});

export default mongoose.model('Product', productSchema, 'product');
