import express from 'express';
import authMiddleware from '../../app/Middlewares/AuthMiddleware.js';
import CategoryController from '../../app/Controller/Admin/CategoryController.js';
import {
  storeUpdateCategoryValidation,
  indexCategoryValidation
} from '../../app/Validations/Admin/CategoryValidation.js';
import { uploadImageFirebaseMiddleware } from '../../app/Middlewares/UploadFirebaseMiddleware.js';
import uploadImageMiddleware from '../../app/Middlewares/UploadImageMiddleware.js';

const categoryRouter = (app) => {
  const router = express.Router();
  const categoryController = new CategoryController();

  router.use(authMiddleware);

  router.post('/', uploadImageMiddleware.single('image'), uploadImageFirebaseMiddleware, storeUpdateCategoryValidation, categoryController.store)
  router.get('/', indexCategoryValidation, categoryController.index);
  router.get('/:categoryId', categoryController.show);
  router.put('/:categoryId', uploadImageMiddleware.single('image'), uploadImageFirebaseMiddleware, storeUpdateCategoryValidation, categoryController.update)
  router.delete('/:categoryId', categoryController.destroy);

  app.use('/admin/category', router);
};

export default categoryRouter;