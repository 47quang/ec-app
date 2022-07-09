import { getRecipes, saveRecipes } from '../../utils/index';
import * as _ from 'lodash';
import RecipeService from '../../apis/recipe/recipe.service';

interface CookbookData {
  savedRecipes: string[];
  recipes: any[];
}

interface CookbookMethod {
  onSave(params: any): any;
  getRecipes(params: any): any;
  goToRecipe(params: any): any;
}

Page<CookbookData, CookbookMethod>({
  data: { savedRecipes: [], recipes: [] },
  async onLoad() {
    // const recipes = await this.getRecipes();
    // this.setData({ recipes });
  },
  async onShow() {
    const savedRecipes = (await getRecipes()) || [];
    this.setData({ savedRecipes });
    if (!_.isEmpty(savedRecipes)) {
      const recipes = await this.getRecipes(savedRecipes.join(','));
      this.setData({ recipes });
    } else {
      this.setData({ recipes: [] });
    }
  },
  onSave(_e: any) {
    const id = _e.target.dataset.id;
    let newSavedRecipes = [];
    if (_.some(this.data.savedRecipes, (recipeId) => id === recipeId)) {
      newSavedRecipes = this.data.savedRecipes.filter((recipeId) => recipeId !== id);
    } else {
      newSavedRecipes = _.uniq([...this.data.savedRecipes, id]);
    }
    this.setData({
      savedRecipes: newSavedRecipes,
    });
    saveRecipes(newSavedRecipes);
  },

  async getRecipes(ids: string): Promise<any[]> {
    const response: any = await RecipeService.search({ ids, sort: 'by_views' });
    if (!_.isEmpty(response)) {
      return response.recipes;
    }
    return [];
  },

  goToRecipe(e: any) {
    const recipeId = e.target.dataset.id;
    my.navigateTo({ url: `pages/recipe/index?id=${recipeId}` });
  },
});
