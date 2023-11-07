import express from "express";
import ProfileController from "../../app/Controller/User/ProfileController.js";
import authMiddleware from "../../app/Middlewares/AuthMiddleware.js";
import { uploadAvatarMiddleware } from "../../app/Middlewares/UploadAvatarMiddleware.js";

const profileRouter = (app) => {
  const router = express.Router();
  const profileController = new ProfileController();

  router.use(authMiddleware)

  router.get('/show', profileController.show);
  router.put('/change-password', profileController.changePassword);
  router.put('/update',uploadAvatarMiddleware.single('avatar'), profileController.update)

  // xem lại phần upload kiểm tra email, phone không được trùng 
  app.use('/profile', router);
};

export default profileRouter;