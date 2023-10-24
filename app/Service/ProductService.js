import ProductRepository from "../Repositories/ProductRepository.js";
import Product from '../Models/Product.js'
class ProductService {
  constructor() {
    this.productRepository = new ProductRepository();
  }
  async store(data, authUser) {
    const product = await this.productRepository.create(data, authUser);

    return product;
  };

  async index() {

  };

  async update() {

  };

  async show() {

  };

  async destroy() {

  };
};

export default ProductService;