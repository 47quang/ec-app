import { FilterParams } from 'pages/search';
import recipeRepository from './recipe.repository';
import * as queryString from 'query-string';

class RecipeService {
  search(filterParams: FilterParams) {
    const filterString: string = queryString.stringify(filterParams);
    return new Promise((resolve, reject) => {
      recipeRepository
        .search(filterString)
        .then((res) => {
          const { data } = res;
          if (data) resolve(data);
        })
        .catch((error) => {
          console.log(error);
          reject({});
        });
    });
  }

  getRecipeById(id: string) {
    return new Promise((resolve, reject) => {
      recipeRepository
        .getRecipeById(id)
        .then((res) => {
          const { data } = res;
          if (data) resolve(data.recipes[0]);
        })
        .catch((error) => reject(error));
    });
  }
}

export default new RecipeService();
