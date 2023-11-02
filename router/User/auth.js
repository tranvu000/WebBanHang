import express from "express";
import AuthUserController from "../../app/Controller/User/AuthUserController.js";
import { 
  loginAuthUserValidator,
  registerAuthUserValidator
} from "../../app/Validations/User/AuthUserValidation.js";

const authUserRouter = (app) => {
  const router = express.Router();
  const authUserController = new AuthUserController();

  router.post('/register', registerAuthUserValidator, authUserController.register)
  router.post('/login', loginAuthUserValidator, authUserController.login)

  app.use('/authUser', router)
};

export default authUserRouter;