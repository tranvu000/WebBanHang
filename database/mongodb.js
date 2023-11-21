import mongoose from "mongoose";

const connect = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    autoIndex: true,
  }).then(() => console.log("Connected"));
};

export default connect;