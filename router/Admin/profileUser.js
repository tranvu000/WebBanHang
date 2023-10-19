import express from 'express';
import authMiddleware from '../../app/Middlewares/AuthMiddleware.js';
import ProfileUserController from '../../app/Controller/Admin/ProfileUserController.js';
import { changePasswordValidator } from '../../app/Validations/Admin/ProfileUserValidation.js';
import { uploadAvatarMiddleware } from '../../app/Middlewares/UploadAvatarMiddleware.js';

const profileUserRouter = (app) => {
  const router = express.Router();
  const profileUserController = new ProfileUserController();

  router.use(authMiddleware);

  router.get('/', profileUserController.show)
  router.put('/change-password',changePasswordValidator, profileUserController.changePassword)
  router.put('/', uploadAvatarMiddleware.single('avatar'), profileUserController.update)

  app.use('/profile', router);
}

export default profileUserRouter;