import { responseError, responseSuccess } from "../../Common/helpers.js";
import ShoppingCartsService from "../../Service/ShoppingCartsService.js";

class ShoppingCartsController {
  static shoppingCartsService = new ShoppingCartsService();

  async store (req, res) {
    try {
      const data = req.body;
      
      if (!req.authUser) {
        throw new Error('User khong ton tai')
      } else {
        data.user_id = req.authUser._id
      };

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

  async show (req, res) {
    try {
      res.status(201).json(responseSuccess(
        await ShoppingCartsController.shoppingCartsService.show(
          req.params.shoppingCartsId
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
        !!await ShoppingCartsController.shoppingCartsService.destroy(
          req.params.shoppingCartsId,
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