import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import firebase from "../config/firebase.js";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: Number,
      default: 0,
    },
    birthday: {
      type: Date,
    },
    level: {
      type: Number,
      required: true,
      default: 0,
    },
    address: {
      type: String,
    },
    avatar: {
      type: String,
      default:"user/avatar/default_avatar.png",
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
      virtuals: true,
    },
    toObject: {
      getters: true,
      virtuals: true,
    },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    id: false
  }
);
// userSchema.virtual('_avatar').get(async function () {
//   return await this.getAvatarFromFirebase();
// });
// userSchema.method('getAvatarFromFirebase', async function (cb) {
//   const blob = firebase.bucket.file(this.avatar);
//   const options = {
//     version: 'v2',
//     action: 'read',
//     expires: Date.now() + 1000 * 60 * 60
//   };
//   const url = await blob.getSignedUrl(options);
//   return url[0];
// });

export default mongoose.model("User", userSchema, "users");
