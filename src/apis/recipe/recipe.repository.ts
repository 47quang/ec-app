import { aidenInstance } from '../configs/index';

class RecipeRepository {
  search(searchTerm: string) {
    if (searchTerm) {
      return aidenInstance.get(`/search?${searchTerm}`);
    }
    return aidenInstance.get(`/search`);
  }

  getRecipeById(id: string) {
    return aidenInstance.get(`/search?ids=${id}`);
  }
}

export default new RecipeRepository();
