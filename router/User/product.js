import express from "express";
import
  ProductController
from "../../app/Controller/User/ProductController.js";
import authMiddleware from "../../app/Middlewares/AuthMiddleware.js";

const productRouter = (app) => {
  const router = express.Router();
  const productController = new ProductController();

  router.use(authMiddleware);

  router.get('/search/product', productController.searchProduct);
  router.get('/search/brand', productController.searchBrand);
  router.get('/list/category', productController.listCategory);
  router.get('/list/product', productController.listProduct);
  router.get('/list/category/product', productController.listProductByCategory)
  router.get('/:productId', productController.details);

  app.use('/product', router);
};

export default productRouter;
