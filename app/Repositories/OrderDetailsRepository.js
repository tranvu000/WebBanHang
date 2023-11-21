import BaseRepository from "./BaseRepository.js";
import OrderDetails from "../Models/OrderDetails.js";

class OrderDetailsRepository extends BaseRepository {
  constructor() {
    super(OrderDetails)
  }
};

export default OrderDetailsRepository;