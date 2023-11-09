import express from "express";
import firebaseMiddleware from "../app/Middlewares/firebaseMiddleware.js";
import { uploadFileMiddleware } from "../app/Middlewares/UploadFileMiddleware.js";

const testRouter = (app) => {
  const router = express.Router();

  router.post('/',uploadFileMiddleware.single('file'), firebaseMiddleware)

  
  app.use('/test', router)
};

export default testRouter;