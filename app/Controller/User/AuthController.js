import AuthService from "../../Service/AuthService.js";
import { responseError, responseSuccess } from "../../Common/helpers.js";

class AuthController {
  static authService = new AuthService();
  async register (req, res) {
    try {
      // dataUser.password = hashString(dataUser.password);
      res.status(201).json(responseSuccess(
        await AuthController.authService.register(
          req.body
        ),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  }

  async login (req, res) {
    try {
      const level = 2
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
};

export default AuthController;