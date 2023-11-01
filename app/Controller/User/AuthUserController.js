import AuthUserService from "../../Service/User/AuthUserService.js";
import { responseError, responseSuccess } from "../../Common/helpers.js";
import { hashString } from "../../Common/helpers.js";

class AuthUserController {
  static authUserService = new AuthUserService();
  async register (req, res) {
    try {
      // dataUser.password = hashString(dataUser.password);
      res.status(201).json(responseSuccess(
        await AuthUserController.authUserService.register(
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
      res.status(201).json(responseSuccess(
        await AuthUserController.authUserService.login(
          req.body.userEmailPhone,
          req.body.password
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };
};

export default AuthUserController;