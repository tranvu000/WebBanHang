const express = require("express");
const AuthUserController = require('../../app/Controller/User/AuthUserController.js');
const { loginAuthUserValidator } = require("../../app/Validations/User/AuthUserValidation.js");

const authUserRouter = (app) => {
  const router = express.Router();
  const authUserController = new AuthUserController();

  router.post('/login', loginAuthUserValidator, authUserController.login)

  app.use('/authUser', router)
};

module.exports = authUserRouter;