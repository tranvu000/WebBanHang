import { generateJWT, hashString } from "../Common/helpers.js";
import User from "../Models/User.js";

class AuthService {
  async login(userEmailPhone, password) {
    const userByName = await User.findOne({
      $or: [
        {
          email: userEmailPhone,
        },
        {
          phone: userEmailPhone,
        },
        {
          username: userEmailPhone,
        },
      ],
    });
    if (!userByName) {
      throw new Error("Tai khoan khong chinh xac");
    }
    if (hashString(password) !== userByName.password) {
      throw new Error("Mat khau khong chinh xac");
    }
    console.log("2");

    return {
      token: generateJWT(userByName),
    };
  }
}

export default AuthService;
