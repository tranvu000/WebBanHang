import express from 'express';
import authMiddleware from '../../app/Middlewares/AuthMiddleware.js';
import CategoryController from '../../app/Controller/Admin/CategoryController.js';
import { 
  indexCategoryValidation, 
  storeUpdateCategoryValidation 
} from '../../app/Validations/Admin/CategoryValidation.js';

const categoryRouter = (app) => {
  const router = express.Router();
  const categoryController = new CategoryController();

  router.use(authMiddleware);

  router.post('/', storeUpdateCategoryValidation, categoryController.store);
  router.get('/', indexCategoryValidation, categoryController.index);
  router.get('/:categoryId', categoryController.show);
  router.put('/:categoryId', storeUpdateCategoryValidation, categoryController.update);
  router.delete('/:categoryId', categoryController.destroy);

  app.use('/admin/category', router);
};

export default categoryRouter;