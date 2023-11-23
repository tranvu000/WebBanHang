import AuthService from "../../Service/AuthService.js";
import { responseError, responseSuccess } from "../../Common/helpers.js";

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

      res.status(201).json(responseSuccess(
        await AuthController.authService.register(
          data
        ),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    };
  };

  async login (req, res) {
    try {
      const level = 1
      res.status(201).json(responseSuccess(
        await AuthController.authService.login(
          req.body.userEmailPhone,
          level,
          req.body.password
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
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
        )
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    };
  };

};

export default AuthController;