import ProductService from "../../Service/ProductService.js";
import { responseError, responseSuccess } from "../../Common/helpers.js";

class ProductController {
  static productService = new ProductService();

  async searchProduct (req, res) {
    try {
      res.status(201).json(responseSuccess(
        await ProductController.productService.searchProduct(req.query),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async searchBrand (req, res) {
    try {
      res.status(201).json(responseSuccess(
        await ProductController.productService.searchBrand(req.query),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async listCategory (req, res) {
    try {
      res.status(201).json(responseSuccess(
        await ProductController.productService.listCategory(req.query),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async listProduct (req, res) {
    try {
      res.status(201).json(responseSuccess(
        await ProductController.productService.listProduct(req.query),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async listProductByCategory (req, res) {
    try {
      res.status(201).json(responseSuccess(
        await ProductController.productService.listProductByCategory(
          req.params.category_id
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async details (req, res) {
    try {
      res.status(201).json(responseSuccess(
        await ProductController.productService.details(
          req.params.productId
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };
};

export default ProductController;