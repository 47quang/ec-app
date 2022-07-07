import RecipeService from '../../apis/recipe/recipe.service';
interface RecipeData {
  id: string;
  recipe: any;
  tabs: any[];
  recipeTab: number;
}
interface RecipeMethods {
  parseParams(): any;
  onTabChange(params: any): any;
  onTabClick(params: any): any;
}

Page<RecipeData, RecipeMethods>({
  data: {
    id: '',
    recipe: {},
    tabs: [
      {
        title: 'Chế biến',
      },
      {
        title: 'Nguyên liệu',
      },
    ],
    recipeTab: 0,
  },
  // @ts-ignore ==> test ts ignore flag
  async onLoad(query: string) {
    console.log(query);
    const [, id] = query.split('=');

    const recipe: any = await RecipeService.getRecipeById(id);

    recipe.tags = recipe.tags.concat(recipe.tags);

    this.setData({ recipe, id });
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
});
