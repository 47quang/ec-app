import RecipeService from '../../apis/recipe/recipe.service';
import * as _ from 'lodash';

interface RecipeData {
  id: string;
  recipe: any;
  tabs: any[];
  recipeTab: number;
  products: any[];
  cart: any[];
  totalPrice: number;
}
interface RecipeMethods {
  parseParams(): any;
  onTabChange(params: any): any;
  onTabClick(params: any): any;
  getProductDetail(params: any): any;
  onAddToCart(params: any): any;
  calculateTotalPrice(params: any): any;
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
    totalPrice: 0,
    recipeTab: 0,
  },
  // @ts-ignore ==> test ts ignore flag
  async onLoad(query: string) {
    const [, id] = query.split('=');

    (my as any).addIconsToNavigationBar({
      icons: [
        {
          image: '../../public/assets/icons/order.svg',
          width: 25,
          height: 25,
        },
      ],
      padding: 10,
      success: (res: any) => {
        console.log(res);
      },
      fail: (res: any) => {
        console.log(res);
      },
    });

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
    const products: any[] = await Promise.all(
      urls.map((url) => {
        // return axios.get(url).then((res) => _.get(res, 'data.product', {}));
        return new Promise((resolve, reject) => {
          my.request({
            url,
            method: 'GET',
            headers: {
              'content-type': 'application/json',
            },
            dataType: 'json',
            success: (res: any) => {
              resolve(res.product);
            },
            fail: (_res: any) => {
              reject([]);
            },
          });
        });
      }),
    );
    const c = products.map((p) => {
      const stockItem = _.get(p, 'stock_item.qty', 0);
      return { ...p, _qty: stockItem > 0 ? 1 : 0 };
    });
    this.setData({
      products,
      cart: c,
      totalPrice: this.calculateTotalPrice(c),
    });
  },

  calculateTotalPrice(c: any) {
    return c.reduce((acc: any, val: any) => {
      acc += val._qty * val.price;
      return acc;
    }, 0);
  },

  onChangeStepper(e: any, m: any, c: any) {
    console.log({ e, m, c });
  },

  onTapStepper(e: any) {
    console.log(e);
  },

  onUpdateStepper(cartId: any, qty: any) {
    // const cartItem = _.find(this.data.cart, { id: cartId });
    const newCart = this.data.cart.map((c) => {
      if (cartId === c.id) {
        return { ...c, _qty: qty, sum: qty * c.price };
      }
      return { ...c };
    });
    this.setData({
      cart: newCart,
      totalPrice: this.calculateTotalPrice(newCart),
    });
  },

  onAddToCart() {
    (my as any).addToCart({
      products: this.data.cart.map((c) => ({ productId: c.id, quantity: c._qty })),
      success: (res: any) => {
        console.log('success', res);
      },
      fail: (res: any) => {
        console.log('fail', res);
      },
    });

    (my as any).openScreen({
      screenCode: 'TK_CART',
      success: (res: any) => {
        console.log({ res });
      },
      fail: (res: any) => {
        console.log({ res });
      },
    });
  },

  // onCustomIconEvent(_e: any) {
  //   (my as any).openScreen({
  //     screenCode: 'TK_CART',
  //     success: (res: any) => {
  //       console.log({ res });
  //     },
  //     fail: (res: any) => {
  //       console.log({ res });
  //     },
  //   });
  // },
});
