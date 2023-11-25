import express from "express";
import ShoppingCartsController from "../../app/Controller/User/ShoppingCartsController.js";
import authMiddleware from "../../app/Middlewares/AuthMiddleware.js";
import { storeShoppingCartValidator, updateShoppingCartValidator } from "../../app/Validations/User/ShoppingCartValidation.js";

const shoppingCartsRouter = (app) => {
  const router = express.Router();
  const shoppingCartsController = new ShoppingCartsController();

  router.use(authMiddleware);

  router.post('/', storeShoppingCartValidator, shoppingCartsController.store);
  router.get('/list', shoppingCartsController.list);
  router.put('/:shoppingCartId', updateShoppingCartValidator, shoppingCartsController.update)
  router.delete('/:shoppingCartId', shoppingCartsController.destroy);

  app.use('/shopping-carts', router);
};

export default shoppingCartsRouter;
