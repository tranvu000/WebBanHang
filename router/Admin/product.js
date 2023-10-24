import express from "express";
import ProductController from "../../app/Controller/Admin/ProductController.js";
import authMiddleware from "../../app/Middlewares/AuthMiddleware.js"
import { storeUploadProductAnyMiddleware } from "../../app/Middlewares/StoreUploadProductAnyMiddleware.js";

const productRouter = (app) => {
  const router = express.Router();
  const productController = new ProductController();

  router.use(authMiddleware);

  router.post('/', storeUploadProductAnyMiddleware.any([
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
  router.put('/:productId', productController.update);
  router.delete('/:productId', productController.destroy);

  app.use('/product', router)
};

export default productRouter;
