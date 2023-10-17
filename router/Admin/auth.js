import express from "express";
import AuthController from "../../app/Controller/Admin/AuthController.js";
import {
  changePasswordAuthValidator,
  loginAuthValidator,
} from "../../app/Validations/Admin/AuthValidations.js";

const authRouter = (app) => {
  const router = express.Router();
  const authController = new AuthController();

  router.post("/login", authController.login);
  router.put(
    "/change-password",
    changePasswordAuthValidator,
    authController.changePassword
  );

  app.use("/auth", router);
};

export default authRouter;
