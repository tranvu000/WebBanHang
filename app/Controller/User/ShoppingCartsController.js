import { responseError, responseSuccess } from "../../Common/helpers.js";
import ShoppingCartsService from "../../Service/ShoppingCartsService.js";

class ShoppingCartsController {
  static shoppingCartsService = new ShoppingCartsService();

  async store (req, res) {
    try {
      if (!req.authUser) {
        throw new Error('User khong ton tai')
      }
      
      const data = req.body;
      data.user_id = req.authUser._id;

      res.status(201).json(responseSuccess(
        await ShoppingCartsController.shoppingCartsService.store(
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
        await ShoppingCartsController.shoppingCartsService.list(
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
        await ShoppingCartsController.shoppingCartsService.update(
          req.params.shoppingCartId,
          req.body,
          req.authUser
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  }

  async destroy (req, res) {
    try {
      res.status(201).json(responseSuccess(
        !!await ShoppingCartsController.shoppingCartsService.destroy(
          req.params.shoppingCartId,
          req.authUser
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  }
};

export default ShoppingCartsController;