import { reject } from 'lodash';

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
        reject([]);
      },
    });
  });
};
