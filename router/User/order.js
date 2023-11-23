import express from "express";
import authMiddleware from "../../app/Middlewares/AuthMiddleware.js";
import OrderController from "../../app/Controller/User/OrderController.js";

const orderRouter = (app) => {
  const router = express.Router();
  const orderController = new OrderController();

  router.use(authMiddleware);

  router.post('/', orderController.createOrder);
  router.get('/', orderController.index);
  router.get('/list', orderController.list);
  router.put('/:orderId', orderController.update)

  app.use('/order', router);
};

export default orderRouter;