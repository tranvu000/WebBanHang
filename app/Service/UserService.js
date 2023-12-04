import User from "../Models/User.js";
import EmailService from "./EmailService.js";
import UserRepository from "../Repositories/UserRepository.js";
import { generateUrlFromFirebase } from "../Common/helpers.js";

class UserService {
  constructor() {
    this.emailService = new EmailService();
    this.userRepository = new UserRepository();
  }

  async store(data, authUser) {
    const userEmail = await User.findOne({email: data.email});
    if (!!userEmail) {
      throw new Error("Email da ton tai");
    };
    
    const userPhone = await User.findOne({phone: data.phone});
    if (!!userPhone) {
      throw new Error("Phone number da ton tai");
    };

    const user = await this.userRepository.create(data, authUser);

    await this.emailService.sendMailWithTemplate(
      data.email,
      "Tao tai khoan User",
      'email_template/confirm_email.ejs',
      {
        name: data.name,
        confirmUrl: 'http:localhost:5050/confirm-email'
      }
    );

    return this.handleDataUser(user);
  }

  async index(params) {
    let { level, keyword, limit = 10, page = 1 } = params;
    limit = +limit;
    page = +page;
    const conditions = {};

    if (level) {
      conditions.level = level;
    };

    if (keyword) {
      conditions.$or = [
        {
          username: new RegExp(`${keyword}`, "i"),
        },
        {
          email: new RegExp(`${keyword}`, "i"),
        },
        {
          phone: new RegExp(`${keyword}`, "i"),
        },
      ];
    }

    const users = await this.userRepository.index(conditions, limit, page);

    users.data = await Promise.all(users.data.map(
      async (user) => {
        return await this.handleDataUser(user)
      }
    ));

    return users;
  };

  async show(userId) {
    let user = await User.findById(userId);

    return this.handleDataUser(user);
  };

  async update(userId, data, authUser) {
    return await this.userRepository.update(userId, data, authUser);
  };

  async updateUser(userId, data, authUser) {
    const email_new = data.email;
    const { email } = await User.findById(userId);

    if (email_new !== email) {
      const userEmail = await User.findOne({email: email_new});
      if (!!userEmail) {
      throw new Error("Email da ton tai");
      };
    };

    const phone_new = data.phone;
    const { phone } = await User.findById(userId);

    if (phone_new !== phone) {
      const userPhone = await User.findOne({phone: phone_new});
      if (!!userPhone) {
        throw new Error("Phone number da ton tai");
      };
    };

    const user = await this.userRepository.update(userId, data, authUser);

    return this.handleDataUser(user);
  };

  async destroy(userId, authUser) {
    const userDeleted = await this.userRepository.destroy(userId, authUser, true);

    return userDeleted;
  };

  async handleDataUser (user) {
    user.avatar = await generateUrlFromFirebase(user.avatar);

    return user;
  };
};

export default UserService;
