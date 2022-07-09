import RecipeService from '../../apis/recipe/recipe.service';
import CategoryService from '../../apis/category/category.service';
import * as _ from 'lodash';
import { Category, Recipe, Tag } from 'pages/home';

export interface FilterParams {
  q?: string;
  categoryId?: string;
  tagIds?: string;
  sort?: 'by_views' | 'by_created_at';
  page?: number;
  perpage?: number;
}
interface SearchData {
  debounceId: number;
  categories: Category[];
  filterParams: FilterParams;
  recipes: Recipe[];
  tags: Tag[];
  selectedTag: Tag | null;
  selectedCategory: Category | null;
}
interface SearchMethods {
  parseParams(): any;
  onTabChange(params: any): any;
  onTabClick(params: any): any;
  onInput(params: any): any;
  handleFilterRecipe(filterParams: FilterParams): any;
  onSearchHashtag(params: any): any;
  onTapHashtag(params: any): any;
  onTapRecipe(params: any): any;
  goToRecipe(params: any): any;
  onSelectCategory(params: any): any;
  getCategories(): Promise<Category[]>;
}

Page<SearchData, SearchMethods>({
  data: {
    debounceId: 0,
    categories: [],
    recipes: [],
    tags: [],
    filterParams: {},
    selectedTag: null,
    selectedCategory: null,
  },
  // @ts-ignore ==> test ts ignore flag
  async onLoad(query: string) {
    let categories = await this.getCategories();
    this.setData({ categories });

    const response = await this.handleFilterRecipe(this.data.filterParams);
    if (!_.isEmpty(response)) {
      this.setData({
        recipes: response.recipes,
      });
      return;
    }
    this.setData({
      recipes: [],
    });
  },

  onTabClick({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
  onTabChange({ index, tabsName }) {
    this.setData({
      [tabsName]: index,
    });
  },
  onInput(e) {
    const input = e.detail.value;
    if (this.data.debounceId) {
      clearTimeout(this.data.debounceId);
    }
    const id = setTimeout(async () => {
      const response = await this.handleFilterRecipe({
        ...this.data.filterParams,
        q: input,
      });
      if (!_.isEmpty(response)) {
        this.setData({
          recipes: response.recipes,
        });
        return;
      }
      this.setData({
        recipes: [],
      });
    }, 500);
    this.setData({ debounceId: id });
  },

  handleFilterRecipe(filterParams: FilterParams): Promise<any> {
    return RecipeService.search(filterParams);
  },

  async getCategories(): Promise<Category[]> {
    const categories = (await CategoryService.getAllCategories()) as Category[];
    return categories;
  },

  async onSearchHashtag(searchTerm: string) {
    if (this.data.debounceId) {
      clearTimeout(this.data.debounceId);
    }
    const id = setTimeout(async () => {
      const response = await this.handleFilterRecipe({ q: `#${searchTerm}` });
      if (!_.isEmpty(response)) {
        this.setData({
          tags: response.tags,
        });
        return;
      }

      this.setData({
        tags: [],
      });
    }, 1000);

    this.setData({
      debounceId: id,
    });
  },

  async onTapHashtag(e) {
    if (e.id === this.data.selectedTag?.id) {
      this.setData({ selectedTag: null });
      const response = await this.handleFilterRecipe({
        ...this.data.filterParams,
        tagIds: undefined,
      });
      if (!_.isEmpty(response)) {
        this.setData({
          recipes: response.recipes,
        });

        console.log(response.recipes);
        return;
      }
      this.setData({
        recipes: [],
      });
    } else {
      this.setData({ selectedTag: e });
      const response = await this.handleFilterRecipe({ ...this.data.filterParams, tagIds: e.id });
      if (!_.isEmpty(response)) {
        this.setData({
          recipes: response.recipes,
        });

        console.log(response.recipes);
        return;
      }
      this.setData({
        recipes: [],
      });
    }
  },

  goToRecipe(e: any) {
    const recipeId = e.target.dataset.id;
    my.navigateTo({ url: `pages/recipe/index?id=${recipeId}` });
  },

  async onSelectCategory(e) {
    if (e.id === this.data.selectedCategory?.id) {
      this.setData({ selectedCategory: null });
      const response = await this.handleFilterRecipe({
        ...this.data.filterParams,
        categoryId: undefined,
      });
      if (!_.isEmpty(response)) {
        this.setData({
          recipes: response.recipes,
        });

        console.log(response.recipes);
        return;
      }
      this.setData({
        recipes: [],
      });
    } else {
      this.setData({ selectedCategory: e });
      const response = await this.handleFilterRecipe({
        ...this.data.filterParams,
        categoryId: e.id,
      });
      if (!_.isEmpty(response)) {
        this.setData({
          recipes: response.recipes,
        });

        console.log(response.recipes);
        return;
      }
      this.setData({
        recipes: [],
      });
    }
  },
});
