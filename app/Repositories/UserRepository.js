import BaseRepository from "./BaseRepository.js";
import User from "../Models/User.js";

class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }
}

export default UserRepository;
