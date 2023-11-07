import express from 'express';
import authMiddleware from '../../app/Middlewares/AuthMiddleware.js';
import ProfileController from '../../app/Controller/Admin/ProfileController.js';
import { changePasswordValidator } from '../../app/Validations/Admin/ProfileValidation.js';
import { uploadAvatarMiddleware } from '../../app/Middlewares/UploadAvatarMiddleware.js';

const profileAdminRouter = (app) => {
  const router = express.Router();
  const profileController = new ProfileController();

  router.use(authMiddleware);

  router.get('/show', profileController.show)
  router.put('/change-password',changePasswordValidator, profileController.changePassword)
  router.put('/update', uploadAvatarMiddleware.single('avatar'), profileController.update)

  app.use('/admin/profile', router);
}

export default profileAdminRouter;