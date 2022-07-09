import RecipeService from '../../apis/recipe/recipe.service';
import axios from 'axios';
import * as _ from 'lodash';

interface RecipeData {
  id: string;
  recipe: any;
  tabs: any[];
  recipeTab: number;
  products: any[];
  cart: any[];
}
interface RecipeMethods {
  parseParams(): any;
  onTabChange(params: any): any;
  onTabClick(params: any): any;
  getProductDetail(params: any): any;
  onChangeStepper(params: any, m: any, c: any): any;
  onUpdateStepper(c: any, e: any): any;
}

Page<RecipeData, RecipeMethods>({
  data: {
    id: '',
    recipe: {},
    tabs: [{ title: 'Chế biến' }, { title: 'Nguyên liệu' }],
    products: [],
    cart: [],
    recipeTab: 0,
  },
  // @ts-ignore ==> test ts ignore flag
  async onLoad(query: string) {
    const [, id] = query.split('=');

    const recipe: any = await RecipeService.getRecipeById(id);

    this.setData({ recipe, id });
    const productUrls = _.get(recipe, 'products', []).map((item: any) => item.data_source_url);
    await this.getProductDetail(productUrls);
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

  async getProductDetail(urls: string[]) {
    const products = await Promise.all(
      urls.map((url) => {
        return axios.get(url).then((res) => _.get(res, 'data.product', {}));
      }),
    );
    this.setData({
      products,
      cart: products.map((p) => {
        const stockItem = _.get(p, 'stock_item.qty', 0);
        return { ...p, _qty: stockItem > 0 ? 1 : 0 };
      }),
    });
  },

  onChangeStepper(e: any, m: any, c: any) {
    console.log({ e, m, c });
  },

  onTapStepper(e: any) {
    console.log(e);
  },

  onUpdateStepper(cartId: any, qty: any) {
    console.log({ cartId, qty });
  },
});
