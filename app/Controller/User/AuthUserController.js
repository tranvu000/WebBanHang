const AuthUserService = require("../../Service/User/AuthUserService.js")
const { responseError, responseSuccess } = require("../../Common/helpers.js");

class AuthUserController {
  static authUserService = new AuthUserService();
  async login(req, res) {
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
  }
}

module.exports = AuthUserController;