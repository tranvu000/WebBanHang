import BrandService from "../../Service/BrandService.js";
import { responseSuccess, responseError } from "../../Common/helpers.js";

class BrandController {
  static brandService = new BrandService();

  async store (req, res) {
    try {
      res.status(201).json(responseSuccess(
        await BrandController.brandService.store(req.body, req.authUser),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    }
  };

  async index (req, res) {
    try {
      res.status(201).json(responseSuccess(
        await BrandController.brandService.index(req.query),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    }
  };

  async show (req, res) {
    try {
      res.status(201).json(responseSuccess(
        await BrandController.brandService.show(req.params.brandId)
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async update (req, res) {
    try {
      res.status(201).json(responseSuccess(
        await BrandController.brandService.update(
          req.params.brandId,
          req.body,
          req.authUser
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async destroy (req, res) {
    try {
      res.status(201).json(responseSuccess(
        !!await BrandController.brandService.destroy(req.params.brandId),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  }
};

export default BrandController;