import { responseError, responseSuccess } from "../../Common/helpers.js";
import ShoppingCartService from "../../Service/ShoppingCartService.js";

class ShoppingCartController {
  static shoppingCartService = new ShoppingCartService();

  async store (req, res) {
    try {
      if (!req.authUser) {
        throw new Error('User khong ton tai')
      }
      
      const data = req.body;
      data.user_id = req.authUser._id;

      res.status(201).json(responseSuccess(
        await ShoppingCartController.shoppingCartService.store(
          data,
          req.authUser
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async list (req, res) {
    try {
      res.status(201).json(responseSuccess(
        await ShoppingCartController.shoppingCartService.list(
          req.authUser._id
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async update (req, res) {
    try {
      res.status(201).json(responseSuccess(
        await ShoppingCartController.shoppingCartService.update(
          req.params.shoppingCartId,
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
        !!await ShoppingCartController.shoppingCartService.destroy(
          req.params.shoppingCartId,
          req.authUser
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };
};

export default ShoppingCartController;