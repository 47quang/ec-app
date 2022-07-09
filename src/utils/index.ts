import * as _ from 'lodash';

export const saveRecipes = (value: any) => {
  my.setStorage({
    key: 'recipes-storage',
    data: value,
  });
};

export const getRecipes = (): Promise<string[]> => {
  return new Promise((resolve, _reject) => {
    my.getStorage({
      key: 'recipes-storage',
      success(res) {
        resolve(res.data as string[]);
      },
      fail() {
        _reject([]);
      },
    });
  });
};

export const formatNumber = (a: number) => {
  if (a < 1000) return a;
  return `${(_.round(a / 1000, 1))}k`;
};
