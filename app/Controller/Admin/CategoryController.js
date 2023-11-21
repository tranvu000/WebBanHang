import { responseSuccess, responseError } from "../../Common/helpers.js";
import CategoryService from "../../Service/CategoryService.js";

class CategoryController {
  static categoryService = new CategoryService;
  async store(req, res) {
    try {
      res.status(201).json(responseSuccess(
        await CategoryController.categoryService.store(req.body, req.authUser),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  }

  async index(req, res) {
    try {
      res.status(201).json(responseSuccess(
        await CategoryController.categoryService.index(req.query),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
    console.log(req.query);
  }
  
  async show(req, res) {
    try {
      res.status(201).json(responseSuccess(
        await CategoryController.categoryService.show(req.params.categoryId),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  }

  async update(req, res) {
    try {
      res.status(201).json(responseSuccess(
        await CategoryController.categoryService.update(
          req.params.categoryId,
          req.body,
          req.authUser
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  }

  async destroy(req, res) {
    try {
      res.status(201).json(responseSuccess(
        !!await CategoryController.categoryService.destroy(
          req.params.categoryId,
          req.authUser
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    }
  }
  
};

export default CategoryController;