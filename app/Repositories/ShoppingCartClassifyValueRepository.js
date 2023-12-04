import BaseRepository from "./BaseRepository.js";
import ShoppingCartClassifyValues from "../Models/ShoppingCartClassifyValues.js";

class ShoppingCartClassifyValueRepository extends BaseRepository {
  constructor() {
    super(ShoppingCartClassifyValues)
  }
};

export default ShoppingCartClassifyValueRepository;