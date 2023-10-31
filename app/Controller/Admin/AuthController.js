import { hashString, responseError, responseSuccess } from '../../Common/helpers.js';
import AuthService from '../../Service/AuthService.js';

class AuthController {
  static authService = new AuthService();
  async login(req, res) {
    try {
      res.status(201).json(responseSuccess(
        await AuthController.authService.login(
          req.body.userEmailPhone,
          req.body.password
        ),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    }
  };
}

export default AuthController;
