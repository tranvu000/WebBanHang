import express from 'express';
import authMiddleware from '../../app/Middlewares/AuthMiddleware.js';
import ProfileController from '../../app/Controller/Admin/ProfileController.js';
import { uploadAvatarFirebaseMiddleware } from '../../app/Middlewares/UploadFirebaseMiddleware.js';
import { updateProfileValidator } from '../../app/Validations/Admin/ProfileValidation.js';
import uploadImageMiddleware from '../../app/Middlewares/UploadImageMiddleware.js';

const profileAdminRouter = (app) => {
  const router = express.Router();
  const profileController = new ProfileController();

  router.use(authMiddleware);

  router.get('/', profileController.show)
  router.put('/update', uploadImageMiddleware.single('avatar'), uploadAvatarFirebaseMiddleware, updateProfileValidator, profileController.update)

  app.use('/admin/profile', router);
}

export default profileAdminRouter;