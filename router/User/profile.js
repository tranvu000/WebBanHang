import express from "express";
import ProfileController from "../../app/Controller/User/ProfileController.js";
import authMiddleware from "../../app/Middlewares/AuthMiddleware.js";
import { updateProfileValidator } from "../../app/Validations/User/ProfileValidation.js";
import uploadImageMiddleware from "../../app/Middlewares/UploadImageMiddleware.js";
import { uploadAvatarFirebaseMiddleware } from "../../app/Middlewares/FirebaseMiddleware.js";

const profileRouter = (app) => {
  const router = express.Router();
  const profileController = new ProfileController();

  router.use(authMiddleware)

  router.get('/', profileController.show);
  router.put('/update', uploadImageMiddleware.single('avatar'), uploadAvatarFirebaseMiddleware, updateProfileValidator, profileController.update)

  app.use('/profile', router);
};

export default profileRouter;