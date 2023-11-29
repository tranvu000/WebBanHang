import express from "express";
import AuthController from "../../app/Controller/Admin/AuthController.js";
import {
  confirmAccountValidator,
  loginAuthValidator,
  changePasswordValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  registerAuthValidator
} from "../../app/Validations/Admin/AuthValidations.js";

const authAdminRouter = (app) => {
  const router = express.Router();
  const authController = new AuthController();

  router.post('/register', registerAuthValidator, authController.register);
  router.post('/login', loginAuthValidator, authController.login);
  router.post('/confirm-account', confirmAccountValidator, authController.confirmAccount);
  router.post('/confirm-account/change-password', changePasswordValidator, authController.changePassword);
  router.post('/forgot-password', forgotPasswordValidator, authController.postSendCodeForgotPassword);
  router.post('/reset-password', resetPasswordValidator, authController.postResetPassword);

  app.use("/admin/auth", router);
};

export default authAdminRouter;
