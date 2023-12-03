import express from "express";
import ProductController from "../../app/Controller/Admin/ProductController.js";
import authMiddleware from "../../app/Middlewares/AuthMiddleware.js"
import { indexProductValidator, storeUpdateProductValidator } from "../../app/Validations/Admin/ProductValidation.js";
import uploadProductMiddleware from "../../app/Middlewares/UploadProductMiddleware.js";
import { uploadProductFirebaseMiddleware } from "../../app/Middlewares/FirebaseMiddleware.js";

const productAdminRouter = (app) => {
  const router = express.Router();
  const productController = new ProductController();

  router.use(authMiddleware);

  router.post(
    '/',
    uploadProductMiddleware.any([
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
    ]),
    uploadProductFirebaseMiddleware,
    productController.store
  );
  router.get('/', indexProductValidator, productController.index);
  router.get('/:productId', productController.show);
  router.put(
    '/:productId',
    uploadProductMiddleware.any([
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
    ]),
    uploadProductFirebaseMiddleware,
    storeUpdateProductValidator,
    productController.update
  );
  router.delete('/:productId', productController.destroy);

  app.use('/admin/product', router)
};

export default productAdminRouter;
