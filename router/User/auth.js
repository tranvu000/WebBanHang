import express from "express";
import AuthController from "../../app/Controller/User/AuthController.js";
import { 
  loginAuthValidator,
  registerAuthValidator
} from "../../app/Validations/User/AuthValidation.js";

const authRouter = (app) => {
  const router = express.Router();
  const authController = new AuthController();

  router.post('/register', registerAuthValidator, authController.register)
  router.post('/login', loginAuthValidator, authController.login)

  app.use('/auth', router)
};

export default authRouter;