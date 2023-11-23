import { responseSuccess, responseError } from "../../Common/helpers.js";
import CategoryService from "../../Service/CategoryService.js";

class CategoryController {
  static categoryService = new CategoryService;

  async store(req, res) {
    try {
      const data = {
        name: req.body.name
      };
      if (req.file) {
        data.image = req.file.filename;
      };

      res.status(201).json(responseSuccess(
        await CategoryController.categoryService.store(
          data,
          req.authUser
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async index(req, res) {
    try {
      res.status(201).json(responseSuccess(
        await CategoryController.categoryService.index(req.query),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };
  
  async show(req, res) {
    try {
      res.status(201).json(responseSuccess(
        await CategoryController.categoryService.show(req.params.categoryId),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    };
  };

  async update(req, res) {
    try {
      const data = req.body;

      if (req.file) {
        data.image = req.file.filename;
      };

      res.status(201).json(responseSuccess(
        await CategoryController.categoryService.update(
          req.params.categoryId,
          data,
          req.authUser
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

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
  };

  async list(req, res) {
    try {
      res.send('hi')
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    }
  }
  
};

export default CategoryController;