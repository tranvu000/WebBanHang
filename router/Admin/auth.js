import express from "express";
import AuthController from "../../app/Controller/Admin/AuthController.js";
import {
  changePasswordAuthValidator,
  loginAuthValidator,
} from "../../app/Validations/Admin/AuthValidations.js";
import authMiddleware from "../../app/Middlewares/AuthMiddleware.js";

const authRouter = (app) => {
  const router = express.Router();
  const authController = new AuthController();

  router.post("/login", loginAuthValidator, authController.login);
  router.put("/change-password",
    authMiddleware,
    changePasswordAuthValidator,
    authController.changePassword
  );

  app.use("/auth", router);
};

export default authRouter;
