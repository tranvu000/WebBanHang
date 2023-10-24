import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const productSchema = new mongoose.Schema({
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
    require: true
  },
  brand_id: {
    type: ObjectId,
    require: true
  },

});

export default mongoose.model('Product', productSchema, 'product');
