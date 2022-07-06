import { aidenInstance } from '../configs/index';

class RecipeRepository {
  search(searchTerm: string) {
    return aidenInstance.get(`/search?q=${searchTerm}`);
  }
}

export default new RecipeRepository();
