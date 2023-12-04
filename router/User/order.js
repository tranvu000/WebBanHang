import express from "express";
import authMiddleware from "../../app/Middlewares/AuthMiddleware.js";
import OrderController from "../../app/Controller/User/OrderController.js";
import { 
  indexOrderValidator,
  storeOrderValidator,
  updateOrderValidator 
} from "../../app/Validations/User/OrderValidation.js";

const orderRouter = (app) => {
  const router = express.Router();
  const orderController = new OrderController();

  router.use(authMiddleware);

  router.post('/', storeOrderValidator, orderController.store);
  router.get('/', indexOrderValidator, orderController.index);
  router.get('/list', orderController.list);
  router.put('/:orderId', updateOrderValidator, orderController.update);

  app.use('/order', router);
};

export default orderRouter;