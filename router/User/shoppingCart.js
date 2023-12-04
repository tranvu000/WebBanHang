import express from "express";
import ShoppingCartController from "../../app/Controller/User/ShoppingCartController.js"
import authMiddleware from "../../app/Middlewares/AuthMiddleware.js";
import { storeShoppingCartValidator, updateShoppingCartValidator } from "../../app/Validations/User/ShoppingCartValidation.js";

const shoppingCartsRouter = (app) => {
  const router = express.Router();
  const shoppingCartController = new ShoppingCartController();

  router.use(authMiddleware);

  router.post('/', storeShoppingCartValidator, shoppingCartController.store);
  router.get('/list', shoppingCartController.list);
  router.put('/:shoppingCartId', updateShoppingCartValidator, shoppingCartController.update)
  router.delete('/:shoppingCartId', shoppingCartController.destroy);

  app.use('/shopping-carts', router);
};

export default shoppingCartsRouter;
