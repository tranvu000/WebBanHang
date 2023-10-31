const express = require("express");
const AuthUserController = require('../../app/Controller/User/AuthUserController.js');
const { loginAuthValidator } = require("../../app/Validations/Admin/AuthValidations.js");

const authUserRouter = (app) => {
  const router = express.Router();
  const authUserController = new AuthUserController();

  router.post('/login', loginAuthValidator, authUserController.login)

  app.use('/authUser', router)
};

module.exports = authUserRouter;