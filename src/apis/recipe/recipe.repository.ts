import { aidenInstance } from '../configs/index';

class RecipeRepository {
  search(searchTerm: string) {
    return aidenInstance.get(`/search?q=${searchTerm}`);
  }

  getRecipeById(id: string) {
    return aidenInstance.get(`/search?ids=${id}`);
  }
}

export default new RecipeRepository();
