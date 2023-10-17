import UserRepository from "../Repositories/UserRepository.js";
import User from "../Models/User.js";

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async store(data, authUser) {
    const user = await this.userRepository.create(data, authUser);

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

  async destroy(userId, authUser) {
    const userDeleted = await User.findByIdAndDelete(userId, authUser);

    return userDeleted;
  }
}

export default UserService;
