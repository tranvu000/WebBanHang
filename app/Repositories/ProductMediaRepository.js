import BaseRepository from "./BaseRepository.js";
import ProductMedia from "../Models/ProductMedia.js";

class ProductMediaRepository extends BaseRepository {
  constructor() {
    super(ProductMedia)
  }
};

export default ProductMediaRepository;