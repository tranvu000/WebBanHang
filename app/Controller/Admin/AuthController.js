import {
  hashString,
  responseError,
  responseSuccess,
} from "../../Common/helpers.js";
import AuthService from "../../Service/AuthService.js";
import UserService from "../../Service/UserService.js";

class AuthController {
  async login(req, res) {
    const authService = new AuthService();
    try {
      res
        .status(201)
        .json(
          responseSuccess(
            await authService.login(req.body.userEmailPhone, req.body.password)
          )
        );
    } catch (e) {
      console.log(e);
      res.status(500).json(responseError(e, 500));
    }
    console.log(req.body);
  }

  async changePassword(req, res) {
    const userService = UserService();
    try {
      res.ststus(201).json(
        responseSuccess(
          await userService.update(rep.authUser._id, {
            password: hashString(req.body.password),
          })
        )
      );
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    }
  }
}

export default AuthController;
