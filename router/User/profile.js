import express from "express";
import ProfileController from "../../app/Controller/User/ProfileController.js";
import authMiddleware from "../../app/Middlewares/AuthMiddleware.js";
import { uploadAvatarMiddleware } from "../../app/Middlewares/UploadImageMiddleware.js";
import uploadFileMiddleware from "../../app/Middlewares/UploadFileMiddleware.js";
import firebaseMiddleware from "../../app/Middlewares/FirebaseMiddleware.js";
import { updateProfileValidator } from "../../app/Validations/User/ProfileValidation.js";

const profileRouter = (app) => {
  const router = express.Router();
  const profileController = new ProfileController();

  router.use(authMiddleware)

  router.get('/show', profileController.show);
  router.put('/change-password', profileController.changePassword);
  // router.put('/update',uploadAvatarMiddleware.single('avatar'), profileController.update)
  router.put('/update',uploadFileMiddleware.single('avatar'), firebaseMiddleware, updateProfileValidator, profileController.update)

  app.use('/profile', router);
};

export default profileRouter;