import { responseError, responseSuccess } from "../../Common/helpers.js";
import OrderService from "../../Service/OrderService.js";
import { ORDER_STATUS } from "../../config/constants.js";

class OrderController {
  static orderService = new OrderService();

  async createOrder(req, res) {
    try {
      if (!req.authUser) {
        throw new Error('User khong ton tai')
      };

      const data = req.body;
      data.user_id = req.authUser._id;

      const result = await OrderController.orderService.createOrder(
        data,
        req.authUser
      );

      res.status(201).json(responseSuccess(
        result,
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async list(req, res) {
    try {
      res.status(201).json(responseSuccess(
        await OrderController.orderService.list(req.query)
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async update(req, res) {
    try {
      // res.status(201).json(responseSuccess(
      //   await 
      // ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  }
};

export default OrderController;