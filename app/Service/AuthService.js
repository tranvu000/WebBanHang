import { generateJWT, hashString, parserJWTToken, generateVerifyCode, isVerifyPhone } from "../Common/helpers.js";
import HttpError from "../Exceptions/HttpError.js";
import User from "../Models/User.js";
import Verify from "../Models/Verify.js";
import UserRepository from "../Repositories/UserRepository.js";
import { NUMBER_VERIFY_CODE, USERS} from "../config/constants.js";
import vonage from "../config/nexmo.js";
class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  };

  async register (data) {
    const userEmail = await User.findOne({email: data.email});
    if(!!userEmail) {
      throw new Error("Email da ton tai");
    };

    const userPhone = await User.findOne({phone: data.phone});
    if(!!userPhone) {
      throw new Error("Phone number da ton tai");
    };

    if (data.level != 1) {
      throw new Error("Level khong chinh xac");
    };

    data.password = hashString(data.password);
    const user = await this.userRepository.create(data)

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

  async changePassword (token, oldPassword, newPassword) {
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

    const hashedOldPassword = hashString(oldPassword);

    if (hashedOldPassword !== user.password) {
      throw new Error('Mật khẩu cũ không chính xác', 401);
    };
    
    const hashedPassword = await hashString(newPassword);

    if (hashedOldPassword === hashedPassword) {
      throw new Error('Mật khẩu mới không được trùng với mật khẩu cũ')
    };
    
    const userUpdated = await this.userRepository.update(
      userId,
      {
        password: hashedPassword
      }
    );

    return !!userUpdated;
  };

  async postSendCodeForgotPassword (phone, level) {
    const account = await User.findOne({phone});

    if (!account) {
      throw new Error("Tài khoản không tồn tại");
    } else if (account.level !== level) {
      throw new Error("Level khong chinh xac")
    };
    const verifyCode = generateVerifyCode(NUMBER_VERIFY_CODE);

    console.log(vonage);
    await Verify.findOneAndDelete({phone});
    await Verify.create({
      code: verifyCode,
      phone,
      dateCreated: Date.now(),
    });
    return !!Verify;
  };

  async postResetPassword(phone, password, verifyCode, level) {
    const account = await User.findOne({phone});

    if (!account) {
      throw new Error("Tài khoản không tồn tại");
    } else if (account.level !== level) {
      throw new Error("Level khong chinh xac")
    };

    const isVerify = await isVerifyPhone(phone, verifyCode);

    if (!isVerify) {
      throw new HttpError('Mã xác nhận không hợp lệ.', 401);
    };
    const hashedOldPassword = account.password

    const hashedPassword = await hashString(password);

    if (hashedPassword === hashedOldPassword) {
      throw new Error('Mật khẩu mới không được trùng với mật khẩu cũ')
    };
    
    const response = await User.updateOne(
      { phone },
      { password: hashedPassword }
    );
    console.log(response);
    if (response.modifiedCount === 1) {
      await Verify.deleteOne({ phone });
      return true
    } else {
      throw new HttpError('Thay đổi mật khẩu thất bại.', 409);
    };


  };

  async getUser (data){
    const user = await User.findOne(data)
    return user
  };
}

export default AuthService;
