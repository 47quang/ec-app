import { FilterParams } from 'pages/search';
import recipeRepository from './recipe.repository';
import * as queryString from 'query-string';

class RecipeService {
  search(filterParams: FilterParams) {
    const searchTerm: string = queryString.stringify(filterParams);
    return recipeRepository.search(searchTerm);
  }

  getRecipeById(id: string) {
    return recipeRepository.getRecipeById(id);
  }
}

export default new RecipeService();
