import BaseRepository from "./BaseRepository.js";
import ShoppingCart from "../Models/ShoppingCart.js";

class ShoppingCartRepository extends BaseRepository {
  constructor() {
    super(ShoppingCart)
  }
};

export default ShoppingCartRepository;