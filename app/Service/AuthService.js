import { generateJWT, hashString, parserJWTToken } from "../Common/helpers.js";
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

  async login (userEmailPhone, level, password) {
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
    if (!userByName) {
      throw new Error("Tai khoan khong chinh xac");
    } else if (userByName.level != level) {
      throw new Error("Level khong chinh xac")
    } else if (userByName.password !== hashString(password)) {
      throw new Error("Mat khau khong chinh xac");
    }

    return {
      token: generateJWT(userByName),
    };
  };

  async confirmAccount (token) {
    const responseToken = parserJWTToken(token, false);

    if (!responseToken.success) {
      throw new Error(responseToken.errors, 401)
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

    return !!userUpdated;
  };

  async changePassword (token, password) {
    const responseToken = parserJWTToken(token, false);

    if (!responseToken.success) {
      throw new Error(responseToken.errors, 401);
    }

    const userId = responseToken.payload.id;
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User không tồn tại.', 401);
    }

    if (user.is_confirm_account === USERS.is_confirm_account.true) {
      throw new Error('User đã xác thực tài khoản.', 401);
    }

    const userUpdated = await this.userRepository.update(userId, {
      password: hashString(password)
    });
    console.log(password);
    return !!userUpdated;
  }

  async getUser (data){
    const user = await User.findOne(data)
    return user
  }
}

export default AuthService;
