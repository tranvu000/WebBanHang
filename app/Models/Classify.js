import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const classifySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  product_id: {
    type: ObjectId,
    require: true,
    ref: 'Product'
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
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  toJSON: {
    virtuals: true,
  }
});

classifySchema.virtual('classify_values', {
  ref: 'ClassifyValue',
  localField: '_id',
  foreignField: 'classify_id'
});

export default mongoose.model('Classify', classifySchema, 'classify' )