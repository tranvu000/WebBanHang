import { hashString, responseError, responseSuccess } from "../../Common/helpers.js";
import UserService from "../../Service/UserService.js";
class ProfileController {
  static userService = new UserService();
  
  async show (req, res) {
    try {
      if (!req.authUser) {
        throw new Error('User khong ton tai')
      };

      if (req.authUser.level !== 0) {
        throw new Error('Level khong phu hop')
      };
      
      res.status(201).json(responseSuccess(
        await ProfileController.userService.show(
          req.authUser._id
        ),
        201
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async update(req, res) {
    try {
      if (!req.authUser) {
        throw new Error('User khong ton tai')
      };

      if (req.authUser.level !== 0) {
        throw new Error('Level khong phu hop')
      };

      const userId = req.authUser._id;
      const data = req.body;
      res.status(201).json(responseSuccess(
        await ProfileController.userService.updateUser(
          userId,
          data,
          req.authUser
        )
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };
};

export default ProfileController;