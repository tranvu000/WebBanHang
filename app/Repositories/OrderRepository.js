import BaseRepository from "./BaseRepository.js";
import Order from "../Models/Order.js";

class OrderRepository extends BaseRepository {
  constructor() {
    super(Order)
  }
};

export default OrderRepository;