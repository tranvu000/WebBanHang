import {
  hashString,
  responseError,
  responseSuccess,
} from "../../Common/helpers.js";
import UserService from "../../Service/UserService.js";

class UserController {
  static userService = new UserService();

  async store(req, res) {
    try {
      const data = req.body;
      data.password = hashString("12345678");
      res.status(201).json(responseSuccess(
        await UserController.userService.store(data, req.authUser),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    }
  }

  async index(req, res) {
    try {
      res
        .status(201)
        .json(
          responseSuccess(
            await UserController.userService.index(req.query),
            201
          )
        );
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    }
  }

  async show(req, res) {
    try {
      res
        .status(201)
        .json(
          responseSuccess(
            await UserController.userService.show(req.params.userId),
            201
          )
        );
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    }
  }

  async update(req, res) {
    try {
      res
        .status(201)
        .json(
          responseSuccess(
            await UserController.userService.update(
              req.params.userId,
              req.body,
              req.authUser
            ),
            201
          )
        );
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    }
  }

  async destroy(req, res) {
    try {
      res
        .status(201)
        .json(
          responseSuccess(
            !!(await UserController.userService.destroy(
              req.params.userId,
              req.authUser
            )),
            201
          )
        );
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    }
  }
}

export default UserController;
