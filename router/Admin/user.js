import express from "express";
import UserController from "../../app/Controller/Admin/UserController.js";
import {
  IndexUserValidator,
  storeUpdateUserValidator,
} from "../../app/Validations/Admin/UserValidations.js";

const adminUserRouter = (app) => {
  const router = express.Router();
  const userController = new UserController();

  router.post("/", storeUpdateUserValidator, userController.store);
  router.get("/", IndexUserValidator, userController.index);
  router.get("/:userId", userController.show);
  router.put("/:userId", userController.update);
  router.delete("/:userId", userController.destroy);

  app.use("/users", router);
};

export default adminUserRouter;