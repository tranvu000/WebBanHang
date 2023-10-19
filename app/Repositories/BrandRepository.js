import BaseRepository from "./BaseRepository.js";
import Brand from "../Models/Brand.js";

class BrandRepository extends BaseRepository {
  constructor() {
    super(Brand)
  }
};

export default BrandRepository;