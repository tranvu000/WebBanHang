import express from "express";
import ProductController from "../../app/Controller/Admin/ProductController.js";
import authMiddleware from "../../app/Middlewares/AuthMiddleware.js"
import { storeUpdateProductAnyMiddleware } from "../../app/Middlewares/StoreUpdateProductAnyMiddleware.js";
import { indexProductValidator, storeUpdateProductValidator } from "../../app/Validations/Admin/ProductValidation.js";

const productAdminRouter = (app) => {
  const router = express.Router();
  const productController = new ProductController();

  router.use(authMiddleware);

  router.post('/', storeUpdateProductAnyMiddleware.any([
    {
      name: 'images',
      maxCount: 5,
    },
    {
      name: 'video',
      maxCount: 1,
    },
    {
      name: 'classifies[][classify_values][][image]',
      maxCount: 10,
    },
  ]), productController.store);
  router.get('/', productController.index);
  router.get('/:productId', productController.show);
  router.put('/:productId', storeUpdateProductAnyMiddleware.any([
    {
      name: 'images',
      maxCount: 5,
    },
    {
      name: 'video',
      maxCount: 1,
    },
    {
      name: 'classifies[][classify_values][][image]',
      maxCount: 10,
    },
  ]), productController.update);
  router.delete('/:productId', productController.destroy);

  app.use('/admin/product', router)
};

export default productAdminRouter;
