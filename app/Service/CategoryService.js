import Category from "../Models/Category.js";
import CategoryRepository from "../Repositories/CategoryRepository.js";

class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository()
  };

  async store(data, authUser) {
    const category = await this.categoryRepository.create(data, authUser);

    return category;
  }

  async index(params) {
    let { name, limit = 10, page = 1 } = params;
    limit = +limit;
    page = +page;
    let conditions = {};

    if (name) {
      conditions = {
        name: new RegExp (`${name}`, 'i')
      }
    };
    
    return await this.categoryRepository.index(conditions, limit, page);
  };

  async show(categoryId) {
    const categoryShow = await Category.findById(categoryId);

    return categoryShow;
  }

  async update(categoryId, data, authUser) {
    return await this.categoryRepository.update(categoryId, data, authUser)
  }

  async destroy(categoryId, authUser) {
    const categoryDelete = await this.categoryRepository.destroy(categoryId, authUser, true);

    return categoryDelete;
  }
};

export default CategoryService;