import RecipeService from '../../apis/recipe/recipe.service';
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
  filterParams: FilterParams;
  recipes: Recipe[];
  tags: Tag[];
  selectedTag: Tag;
  selectedCategory: Category;
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
}

Page<SearchData, SearchMethods>({
  data: {
    debounceId: 0,
    recipes: [],
    tags: [],
    filterParams: {},
    selectedTag: {} as Tag,
    selectedCategory: {} as Category,
  },
  // @ts-ignore ==> test ts ignore flag
  async onLoad(query: string) {},

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
    }, 1000);
    this.setData({ debounceId: id });
  },

  handleFilterRecipe(filterParams: FilterParams): Promise<any> {
    return RecipeService.search(filterParams);
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
    this.setData({
      selectedTag: e,
    });

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
  },

  async onTapRecipe(e) {
    console.log(e);
  },

  goToRecipe(e: any) {
    const recipeId = e.target.dataset.id;
    my.navigateTo({ url: `pages/recipe/index?id=${recipeId}` });
  },
});
