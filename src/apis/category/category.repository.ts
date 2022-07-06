import { paigInstance } from '../configs/index';

class CategoryRepository {
  getAllCategories() {
    return paigInstance.get('/categories');
  }
}

export default new CategoryRepository();
