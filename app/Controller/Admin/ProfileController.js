import { hashString, responseError, responseSuccess } from "../../Common/helpers.js";
import UserService from "../../Service/UserService.js";

class ProfileController {
  static userService = new UserService();
  async show (req, res) {
    try {
      res.status(201).json(responseSuccess(req.authUser))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  }

  async changePassword(req, res) {
    try {
      res.status(201).json(responseSuccess(
        await ProfileController.userService.update(
          req.authUser._id,
          {
            password: hashString(req.body.password)
          }
        ),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  }
  async update(req, res) {
    try {
      const data = req.body;

      if (req.file) {
        data.avatar = req.file.filename;
      }

      res.status(201).json(responseSuccess(
        await ProfileController.userService.updateUser(
          req.authUser._id,
          data
        )
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  }
}

export default ProfileController;