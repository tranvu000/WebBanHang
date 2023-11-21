import BaseRepository from "./BaseRepository.js";
import OrderDetailClassifyValues from "../Models/OrderDetailClassifyValues.js"

class OrderDetailClassifyValuesRepository extends BaseRepository {
  constructor() {
    super(OrderDetailClassifyValues)
  }
};

export default OrderDetailClassifyValuesRepository;