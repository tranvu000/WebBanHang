import express from "express";
import AuthController from "../../app/Controller/Admin/AuthController.js";
import {
  loginAuthValidator,
} from "../../app/Validations/Admin/AuthValidations.js";

const authAdminRouter = (app) => {
  const router = express.Router();
  const authController = new AuthController();

  router.post("/login", loginAuthValidator, authController.login);

  app.use("/admin/auth", router);
};

export default authAdminRouter;
