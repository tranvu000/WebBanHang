import { generateUrlFromFirebase } from "../Common/helpers.js";
import Category from "../Models/Category.js";
import CategoryRepository from "../Repositories/CategoryRepository.js";

class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository()
  };

  async store(data, authUser) {
    const category = await this.categoryRepository.create(data, authUser);

    return this.handleDataCategory(category);
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
    
    const categories = await this.categoryRepository.index(conditions, limit, page);

    categories.data = await Promise.all(categories.data.map(
      async (category) => {
        return await this.handleDataCategory(category)
      }
    ));

    return categories;
  };

  async show(categoryId) {
    const category = await Category.findById(categoryId);

    return this.handleDataCategory(category);
  };

  async update(categoryId, data, authUser) {
    const category = await this.categoryRepository.update(categoryId, data, authUser)
    
    return this.handleDataCategory(category);
  };

  async destroy(categoryId, authUser) {
    const categoryDelete = await this.categoryRepository.destroy(categoryId, authUser, false);

    return categoryDelete;
  };

  async handleDataCategory (category) {
    category.image = await generateUrlFromFirebase(category.image);
    
    return category;
  };
};

export default CategoryService;