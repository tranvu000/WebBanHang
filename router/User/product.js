import express from "express";
import
  ProductController
from "../../app/Controller/User/ProductController.js";
import authMiddleware from "../../app/Middlewares/AuthMiddleware.js";
import {
  listProductBrandValidator,
  listProductByCategoryValidator,
  searchProductBrandValidator,
} from "../../app/Validations/User/ProductValidation.js";

const productRouter = (app) => {
  const router = express.Router();
  const productController = new ProductController();

  router.use(authMiddleware);

  router.get('/search/product', searchProductBrandValidator, productController.searchProduct);
  router.get('/search/brand',searchProductBrandValidator, productController.searchBrand);
  router.get('/list/category',listProductBrandValidator, productController.listCategory);
  router.get('/list/product',listProductBrandValidator, productController.listProduct);
  router.get('/list/category/product', listProductByCategoryValidator, productController.listProductByCategory)
  router.get('/:productId', productController.details);

  app.use('/product', router);
};

export default productRouter;
