import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const orderDetailClassifyValuesSchema = new mongoose.Schema(
  {
    orderDatail_id: {
      type: ObjectId,
      required: true,
      ref: 'OrderDetail'
    },
    classifyValue_id: {
      type: ObjectId,
      required: true,
      ref: 'ClassifyValue'
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

orderDetailClassifyValuesSchema.virtual('classify_values', {
  ref: 'ClassifyValue',
  foreignField: '_id',
  localField: 'classifyValue_id'
});

export default mongoose.model('OrderDetailClassifyValues', orderDetailClassifyValuesSchema, 'orderDetailClassifyValues')