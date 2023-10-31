const { responseError } = require("../../Common/helpers.js");


class AuthUserController {
  async login(req, res) {
    try {
      res.send('hi')
      console.log(1);
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  }
}

module.exports = AuthUserController;