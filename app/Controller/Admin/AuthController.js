import {
  hashString,
  responseError,
  responseSuccess,
} from "../../Common/helpers.js";
import AuthService from "../../Service/AuthService.js";
import client from "twilio";
class AuthController {
  static authService = new AuthService();
  async login(req, res) {
    try {
      const level = 0;
      res.status(201).json(responseSuccess(
        await AuthController.authService.login(
          req.body.userEmailPhone,
          level,
          req.body.password
        ),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    };
  };

  async confirmAccount(req, res) {
    try {
      res.status(201).json(responseSuccess(
        await AuthController.authService.confirmAccount(
          req.body.token
        ),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    };
  };

  async changePassword(req, res) {
    try {
      res.status(201).json(responseSuccess(
        await AuthController.authService.changePassword(
          req.body.token,
          req.body.oldPassword,
          req.body.newPassword
        ),
        201
      ));
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    };
  };
  
  async forgotPassword(req, res) {
    try {
      const level = 0
      res.status(201).json(responseSuccess(
        await AuthController.authService.login(
          req.body.userEmailPhone,
          level,
        ),
        201
      ))
      // const { email } = req.body;
      // const user = await AuthController.authService.getUser({ email });
      // if (!user) {
      //   throw Error("error");
      // }
      // const phone_number = user.phone;
      // const accountSid = "AC661ccc0309c8e836d8f9073d03b71367";
      // const authToken = "80ed7445cbb6912eccb6b79fb2f606f9";
      // const clientTwilio = client(accountSid, authToken);

      // const result = await clientTwilio.verify.v2
      //   .services("VAb3b46e3b6474bfbaecff5d23c0287361")
      //   .verifications.create({ to: "+84962628409", channel: "sms" })
      //   .then((verification) => console.log(verification.status));
      //   res
      //   .status(201)
      //   .json('ok');
    } catch (e) {
      res.status(500).json(responseError(e, 500));
    }
  }
}

export default AuthController;
