import {
  hashString,
  responseError,
  responseSuccess,
} from "../../Common/helpers.js";
import AuthService from "../../Service/AuthService.js";
import { USERS } from "../../config/constants.js";
class AuthController {
  static authService = new AuthService();

  async register (req, res) {
    try {
      const data = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        gender: req.body.gender,
        level: req.body.level,
      };
      const level = USERS.levels.admin;

      res.status(201).json(responseSuccess(
        await AuthController.authService.register(
          data,
          level
        ),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    };
  };

  async login(req, res) {
    try {
      const level = USERS.levels.admin;
      res.status(201).json(responseSuccess(
        await AuthController.authService.login(
          req.body.userEmailPhone,
          level,
          req.body.password
        ),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    };
  };

  async confirmAccount(req, res) {
    try {
      res.status(201).json(responseSuccess(
        await AuthController.authService.confirmAccount(
          req.body.token
        ),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    };
  };

  async changePassword(req, res) {
    try {
      res.status(201).json(responseSuccess(
        await AuthController.authService.changePassword(
          req.body.token,
          req.body.oldPassword,
          req.body.newPassword
        ),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    };
  };
  
  async postSendCodeForgotPassword(req, res) {
    try {
      const level = USERS.levels.admin;
      const { phone } = req.body;

      res.status(201).json(responseSuccess(
        await AuthController.authService.postSendCodeForgotPassword(
          phone,
          level
        ),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    }
  };

  async postResetPassword (req, res) {
    try {
      const level = USERS.levels.admin;
      const { phone, password, verifyCode } = req.body;
      res.status(201).json(responseSuccess(
        await AuthController.authService.postResetPassword(
          phone,
          password,
          verifyCode,
          level
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    }
  };
}

export default AuthController;
