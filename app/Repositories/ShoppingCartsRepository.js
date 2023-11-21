import BaseRepository from "./BaseRepository.js";
import ShoppingCarts from "../Models/ShoppingCarts.js";

class ShoppingCartsRepository extends BaseRepository {
  constructor() {
    super(ShoppingCarts)
  }
};

export default ShoppingCartsRepository;