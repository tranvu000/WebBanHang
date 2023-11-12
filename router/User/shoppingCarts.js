import express from "express";
import ShoppingCartsController from "../../app/Controller/User/ShoppingCartsController.js";
import authMiddleware from "../../app/Middlewares/AuthMiddleware.js";

const shoppingCartsRouter = (app) => {
  const router = express.Router();
  const shoppingCartsController = new ShoppingCartsController();

  router.use(authMiddleware);

  router.post('/', shoppingCartsController.store);
  router.get('/:shoppingCartsId', shoppingCartsController.show);
  router.delete('/:shoppingCartsId', shoppingCartsController.destroy);

  app.use('/shopping-carts', router);
};

export default shoppingCartsRouter;
