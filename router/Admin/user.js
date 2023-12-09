import express from "express";
import UserController from "../../app/Controller/Admin/UserController.js";
import {
  IndexUserValidator,
  storeUpdateUserValidator,
} from "../../app/Validations/Admin/UserValidations.js";
import authMiddleware from "../../app/Middlewares/AuthMiddleware.js";

const adminUserRouter = (app) => {
  const router = express.Router();
  const userController = new UserController();

  router.use(authMiddleware);
  
  router.post("/", storeUpdateUserValidator, userController.store);
  router.get("/", IndexUserValidator, userController.index);
  router.get("/:userId", userController.show);
  router.put("/:userId",storeUpdateUserValidator, userController.update);
  router.delete("/:userId", userController.destroy);

  app.use("/admin/users", router);
};

export default adminUserRouter;