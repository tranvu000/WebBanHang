import { generateJWT, hashString, parserJWT } from "../Common/helpers.js";
import User from "../Models/User.js";
import UserRepository from "../Repositories/UserRepository.js";
import { USERS} from "../config/constants.js"
class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }
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
          email: userEmailPhone,
        },
        {
          phone: userEmailPhone,
        }
      ]
    });
    // kiểm tra level trong controller
    // if (userByName.level != 1) {
    //   throw new Error("Level khong chinh xac");
    // }
    // if (userByName.level != 2) {
    //   throw new Error("Level khong chinh xac");
    // }
    if (!userByName) {
      throw new Error("Tai khoan khong chinh xac");
    }
    if (hashString(password) !== userByName.password) {
      throw new Error("Mat khau khong chinh xac");
    }

    return {
      token: generateJWT(userByName),
    };
  };

  async confirmAccount (token) {
    const responseToken = parserJWT(token, false);

    if (!responseToken.success) {
      throw new Error(responseToken.error, 401)
    }
    const userId = responseToken.payload.id;
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User không tồn tại.', 401)
    };

    if (user.is_confirm_account === USERS.is_confirm_account.true) {
      throw new Error('User đã xác thực tài khoản.', 401);
    }

    const userUpdated = await this.userRepository.update(
      userId,
      {
        is_confirm_account: USERS.is_confirm_account.true
      },
      user
    );

    return userUpdated;
  };

  async changePassword (token, password) {

  }
}

export default AuthService;
