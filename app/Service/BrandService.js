import BrandRepository from '../Repositories/BrandRepository.js';
import Brand from '../Models/Brand.js';
import { generateUrlFromFirebase } from '../Common/helpers.js';

class BrandService {
  constructor() {
    this.brandRepository = new BrandRepository();
  };

  async store (data, authUser) {
    const brand = await this.brandRepository.create(data, authUser);
    
    return this.handleDataBrand(brand);
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

    const brands = await this.brandRepository.index(conditions, limit, page);
 
    brands.data = await Promise.all(brands.data.map(
      async (brand) => {
        return await this.handleDataBrand(brand)
      }
    ));

    return brands
  };

  async show (brandId) {
    const brand = await Brand.findById(brandId);

    return this.handleDataBrand(brand);
  };

  async update (brandId, data, authUser) {
    const brand =  await this.brandRepository.update(brandId, data, authUser);

    return this.handleDataBrand(brand);
  };

  async destroy (brandId, authUser) {
    const brandDelete = await this.brandRepository.destroy(brandId, authUser, false);

    return brandDelete;
  };

  async handleDataBrand (brand) {
    brand.logo = await generateUrlFromFirebase(brand.logo);
    
    return brand;
  };
};

export default BrandService;