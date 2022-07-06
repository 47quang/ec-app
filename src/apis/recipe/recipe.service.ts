import recipeRepository from './recipe.repository';

class RecipeService {
  search(q: string) {
    return new Promise((resolve, reject) => {
      recipeRepository
        .search(q)
        .then((res) => {
          const { data } = res;
          if (data) resolve(data.recipes);
        })
        .catch((error) => reject(error));
    });
  }
}

export default new RecipeService();
