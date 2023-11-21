import BaseRepository from "./BaseRepository.js";
import ShoppingCartClassifyValues from "../Models/ShoppingCartClassifyValues.js";

class ShoppingCartClassifyValuesRepository extends BaseRepository {
  constructor() {
    super(ShoppingCartClassifyValues)
  }
};

export default ShoppingCartClassifyValuesRepository;