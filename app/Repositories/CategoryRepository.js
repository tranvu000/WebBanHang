import Category from '../Models/Category.js';
import BaseRepository from './BaseRepository.js';

class CategoryRepository extends BaseRepository {
  constructor() {
    super(Category)
  }
};

export default CategoryRepository;