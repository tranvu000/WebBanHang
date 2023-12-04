import express from "express";
import AuthController from "../../app/Controller/User/AuthController.js";
import { 
  loginAuthValidator,
  registerAuthValidator,
  confirmAccountValidator,
  changePasswordValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} from "../../app/Validations/User/AuthValidation.js";

const authRouter = (app) => {
  const router = express.Router();
  const authController = new AuthController();

  router.post('/register', registerAuthValidator, authController.register);
  router.post('/login', loginAuthValidator, authController.login);
  router.post('/confirm-account', confirmAccountValidator, authController.confirmAccount);
  router.post('/confirm-account/change-password', changePasswordValidator, authController.changePassword);
  router.post('/forgot-password', forgotPasswordValidator, authController.postSendCodeForgotPassword);
  router.post('/reset-password', resetPasswordValidator, authController.postResetPassword)
  
  router.post('/forgot-password', );
  

  app.use('/auth', router)
};

export default authRouter;