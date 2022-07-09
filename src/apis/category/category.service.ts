import categoryRepo from './category.repository';

class CategoryService {
  getAllCategories() {
    return categoryRepo.getAllCategories();
  }
}

export default new CategoryService();
