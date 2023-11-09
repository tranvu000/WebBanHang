import User from "../Models/User.js";
import EmailService from "./EmailService.js";
import UserRepository from "../Repositories/UserRepository.js";
import { createTransport } from "nodemailer";

class UserService {
  constructor() {
    this.emailService = new EmailService();
    this.userRepository = new UserRepository();
  }

  async store(data, authUser) {
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

    if(!!userByName) {
      throw new Error("Tai khoan da ton tai");
    };

    const user = await this.userRepository.create(data, authUser);

    await this.emailService.sendMailWithTemplate(
      data.email,
      "Hello",
      'email_template/confirm_email.ejs',
      {
        name: data.name,
        confirmUrl: 'http:localhost:5050/confirm-email'
      }
    );

    return user;
  }

  async index(params) {
    let { level, keyword, limit = 10, page = 1 } = params;
    limit = +limit;
    page = +page;
    const conditions = {};

    if (level) {
      conditions.level = level;
    }

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

    return await this.userRepository.index(conditions, limit, page);
  }

  async show(userId) {
    const user = await User.findById(userId);
    
    return user;
  }

  async update(userId, data, authUser) {
    return await this.userRepository.update(userId, data, authUser);
  }

  async updateUser(userId, data, authUser) {
    const userEmaiPhone = await User.findOne({
      $or: [
        {
          email: data.email
        },
        {
          phone: data.phone
        }
      ]
    });

    if (!!userEmaiPhone) {
      throw new Error("Tai khoan da ton tai")
    }
    
    return await this.userRepository.update(userId, data, authUser);
  }

  async destroy(userId, authUser) {
    const userDeleted = await User.findByIdAndDelete(userId, authUser);

    return userDeleted;
  }
}

export default UserService;
