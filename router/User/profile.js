import express from "express";
import ProfileController from "../../app/Controller/User/ProfileController.js";
import authMiddleware from "../../app/Middlewares/AuthMiddleware.js";
import uploadFileMiddleware from "../../app/Middlewares/UploadFileMiddleware.js";
import firebaseMiddleware from "../../app/Middlewares/UploadFirebaseMiddleware.js";
import { updateProfileValidator } from "../../app/Validations/User/ProfileValidation.js";

const profileRouter = (app) => {
  const router = express.Router();
  const profileController = new ProfileController();

  router.use(authMiddleware)

  router.get('/', profileController.show);
  router.put('/update',uploadFileMiddleware.single('avatar'), firebaseMiddleware, updateProfileValidator, profileController.update)

  app.use('/profile', router);
};

export default profileRouter;