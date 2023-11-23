import { hashString, responseError, responseSuccess } from "../../Common/helpers.js";
import UserService from "../../Service/UserService.js";
import firebase from "../../config/firebase.js";
class ProfileController {
  static userService = new UserService();
  
  async show (req, res) {
    try {
      const user = req.authUser.toObject();
      const blob = firebase.bucket.file(user.avatar);
      const options = {
        version: 'v2',
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60
      };
      const url = await blob.getSignedUrl(options);
      user.avatar = url[0];
      res.status(201).json(responseSuccess(user))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };

  async update(req, res) {
    try {
      const data = req.body;

      if (req.file) {
        data.avatar = req.file.filename;
      }
      console.log(data);
      res.status(201).json(responseSuccess(
        await ProfileController.userService.updateUser(
          req.authUser._id,
          data
        )
      ))
    } catch (e) {
      res.status(500).json(responseError(e, 500))
    }
  };
};

export default ProfileController;