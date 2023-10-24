import BaseRepository from "./BaseRepository.js";
import Product from "../Models/Product.js";


class ProductRepository extends BaseRepository {
  constructor() {
    super(Product)
  }
};

export default ProductRepository;