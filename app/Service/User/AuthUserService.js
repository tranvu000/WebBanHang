const {generateJWT, hashString} = require("../../Common/helpers.js");
const User = require("../../Models/User.js");

class AuthUserService {
  async login (userEmailPhone, password) {
    const userByName = await User.findOne({
      $or: [
        {
          email: userEmailPhone
        },
        {
          phone: userEmailPhone
        },
        {
          username: userEmailPhone
        }
      ],
    });

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

module.exports = AuthUserService;