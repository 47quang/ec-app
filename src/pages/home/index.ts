import CategoryService from '../../apis/category/category.service';
import RecipeService from '../../apis/recipe/recipe.service';
import * as _ from 'lodash';
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
}

interface HomeData {
  categories: Category[];
  recipes: Recipe[];
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
  data: { categories: [], recipes: [] },
  async onLoad(_query = {}) {
    let categories = await this.getCategories();
    let recipes = await this.getRecipes();
    // const fakeCategories = [...categories, ...categories, ...categories].map((item) => ({
    //   ...item,
    //   id: '' + Math.random() * 1000,
    // }));
    // const fakeRecipes = [
    //   ...recipes,
    //   ...recipes,
    //   ...recipes,
    //   ...recipes,
    //   ...recipes,
    //   ...recipes,
    //   ...recipes,
    //   ...recipes,
    //   ...recipes,
    //   ...recipes,
    //   ...recipes,
    //   ...recipes,
    //   ...recipes,
    //   ...recipes,
    //   ...recipes,
    //   ...recipes,
    // ].map((item) => ({
    //   ...item,
    //   id: '' + Math.random() * 1000,
    // }));
    // fakeRecipes[2].title = 'aiden';
    this.setData({ categories, recipes });
  },

  async getCategories(): Promise<Category[]> {
    const categories = (await CategoryService.getAllCategories()) as Category[];
    return categories;
  },

  async getRecipes(): Promise<Recipe[]> {
    const response: any = await RecipeService.search({ sort: 'by_views' });
    if (!_.isEmpty(response)) {
      return response.recipes;
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
});
