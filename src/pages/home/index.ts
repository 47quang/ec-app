import CategoryService from '../../apis/category/category.service';
import RecipeService from '../../apis/recipe/recipe.service';
import * as _ from 'lodash';
import { getRecipes, saveRecipes, formatNumber } from '../../utils/index';
export interface Category {
  id: string;
  name: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
}

interface HomeMethod {
  getCategories(): Promise<Category[]>;
  getRecipes(): Promise<Recipe[]>;
  goToRecipe(recipeId: string): any;
  goToSearch(params: any): any;
  onSave(params: any): any;
}

interface HomeData {
  categories: Category[];
  recipes: Recipe[];
  savedRecipes: string[];
  loading: boolean;
}

export interface Recipe {
  id: string;
  title: string;
  thumbnail: string;
  content: string;
  category: Category;
  author: Author;
  tags: Tag[];
  nutrition: string;
  products: Product[];
  views: number;
  created_at: Date;
  updated_at: Date;
}

interface Product {
  id: string;
  name: string;
  data_source: string;
  data_source_url: string;
  created_at: Date;
  updated_at: Date;
}

export interface Tag {
  id: string;
  name: string;
  type: string;
  created_at: Date;
  updated_at: Date;
}

interface Author {
  id: string;
  user_id: string;
  name: string;
  address: string;
  created_at: Date;
  updated_at: Date;
}

Page<HomeData, HomeMethod>({
  data: { categories: [], recipes: [], savedRecipes: [], loading: true },
  async onShow() {
    const savedRecipes = await getRecipes();
    this.setData({ savedRecipes: savedRecipes || [] });
  },
  async onLoad(_query = {}) {
    // let categories = await this.getCategories();
    // let recipes = await this.getRecipes();
    const [categories, recipes] = await Promise.all([this.getCategories(), this.getRecipes()]);
    this.setData({
      categories: categories as unknown as Category[],
      recipes: recipes as unknown as Recipe[],
      loading: false,
    });
  },

  async getCategories(): Promise<Category[]> {
    const categories = (await CategoryService.getAllCategories()) as Category[];
    return categories;
  },

  async getRecipes(): Promise<Recipe[]> {
    const response: any = await RecipeService.search({ sort: 'by_views' });
    if (!_.isEmpty(response)) {
      return response.recipes.map((recipe: any) => ({
        ...recipe,
        views: formatNumber(recipe.views),
      }));
    }
    return [];
  },

  goToRecipe(e: any) {
    const recipeId = e.target.dataset.id;
    my.navigateTo({ url: `pages/recipe/index?id=${recipeId}` });
  },

  goToSearch(e: any) {
    my.navigateTo({ url: `pages/search/index?categoryId=${e.target.dataset.categoryId}` });
  },

  onSave(_e: any) {
    console.log({ _e });
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
});
