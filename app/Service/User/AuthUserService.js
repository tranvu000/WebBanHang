import { generateJWT, hashString } from "../../Common/helpers.js";
import User from "../../Models/User.js";

class AuthUserService {
  async register (data) {
    const userByName = await User.findOne({
      $or: [
        {
          email: data.email
        },
        {
          phone: data.phone
        }
      ],
    });

    if (data.level != 2) {
      throw new Error("Level khong chinh xac");
    }
    if(!!userByName) {
      throw new Error("Tai khoan da ton tai");
    };

    data.password = hashString(data.password);
    const user = await User.create(data)

    return user;
  }

  async login (userEmailPhone, password) {
    const userByName = await User.findOne({
      $or: [
        {
          email: userEmailPhone
        },
        {
          phone: userEmailPhone
        }
      ],
    });

    if (userByName.level != 2) {
      throw new Error("Level khong chinh xac");
    }
    if(!userByName) {
      throw new Error("Tai khoan khong chinh xac");
    };
    if (hashString(password) !== userByName.password) {
      throw new Error("Mat khau khong chinh xac");
    };

    return {
      token: generateJWT(userByName)
    }
  }
};

export default AuthUserService;