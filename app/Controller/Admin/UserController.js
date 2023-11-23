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
      const data = {
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        level: req.body.level
      };
      data.password = hashString("12345678");

      res.status(201).json(responseSuccess(
        await UserController.userService.store(data, req.authUser),
        201
      ));
    } catch (e) {
      console.log(e);
      res.status(500).json(responseError(e, 500));
    };
  };

  async index(req, res) {
    try {
      res.status(201).json(responseSuccess(
        await UserController.userService.index(req.query),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    };
  };

  async show(req, res) {
    try {
      res.status(201).json(responseSuccess(
        await UserController.userService.show(req.params.userId),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    };
  };

  async update(req, res) {
    try {
      res.status(201).json(responseSuccess(
        await UserController.userService.updateUser(
          req.params.userId,
          req.body,
          req.authUser
        ),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    };
  };

  async destroy(req, res) {
    try {
      res.status(201).json(responseSuccess(
        !!(await UserController.userService.destroy(
          req.params.userId,
          req.authUser
        )),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    };
  };
};

export default UserController;
