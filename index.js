import express from "express";
import router from "./router/index.js";
import { MulterError } from "multer";
import { responseError } from "./app/Common/helpers.js";
import mongoDbConnect from "./database/mongodb.js";

mongoDbConnect();

const app = express();

app.use(express.json());
app.use(express.static("storage"));

router(app)

app.use((err, req, res, next) => {
  if(err instanceof MulterError) {
    return res.status(422).json(responseError(err, 422))
  }

  res.json(responseError(err))
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log("Server listrning on port: " + PORT);
});
