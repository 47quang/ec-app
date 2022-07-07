import CategoryService from '../../apis/category/category.service';
import RecipeService from '../../apis/recipe/recipe.service';

interface Category {
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
}

interface HomeData {
  categories: Category[];
  recipes: Recipe[];
}

interface Recipe {
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

interface Tag {
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
    const fakeCategories = [...categories, ...categories, ...categories].map((item) => ({
      ...item,
      id: '' + Math.random() * 1000,
    }));
    const fakeRecipes = [
      ...recipes,
      ...recipes,
      ...recipes,
      ...recipes,
      ...recipes,
      ...recipes,
      ...recipes,
      ...recipes,
      ...recipes,
      ...recipes,
      ...recipes,
      ...recipes,
      ...recipes,
      ...recipes,
      ...recipes,
      ...recipes,
    ].map((item) => ({
      ...item,
      id: '' + Math.random() * 1000,
    }));
    fakeRecipes[2].title = 'aiden';
    this.setData({ categories: fakeCategories, recipes });
  },

  async getCategories(): Promise<Category[]> {
    const categories = (await CategoryService.getAllCategories()) as Category[];
    return categories;
  },

  async getRecipes(): Promise<Recipe[]> {
    const recipes = (await RecipeService.search('mon')) as Recipe[];
    return recipes;
  },

  goToRecipe(e: any) {
    const recipeId = e.target.dataset.id;
    my.navigateTo({ url: `pages/recipe/index?id=${recipeId}` });
  },
});
