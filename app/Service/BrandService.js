import BrandRepository from '../Repositories/BrandRepository.js';
import Brand from '../Models/Brand.js';

class BrandService {
  constructor() {
    this.brandRepository = new BrandRepository()
  };

  async store (data, authUser) {
    const brand = await this.brandRepository.create(data, authUser);

    return brand;
  };

  async index (params) {
    let {name, limit = 10, page = 1} = params;
    limit = +limit;
    page = +page;
    let conditions = {};

    if (name) {
      conditions = {
        name: new RegExp (`${name}`, 'i')
      }
    };

    return await this.brandRepository.index(conditions, limit, page)
  };

  async show (brandId) {
    const brand = await Brand.findById(brandId);

    return brand;
  };

  async update (brandId, data, authUser) {
    return await this.brandRepository.update(brandId, data, authUser)
  };

  async destroy (brandId, authUser) {
    const brandDelete = await this.brandRepository.destroy(brandId, authUser, true);

    return brandDelete;
  };
};

export default BrandService;