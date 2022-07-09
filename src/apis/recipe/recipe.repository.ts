const BASED_URL = 'https://bc-dev-aiden.ngrok.io';

class RecipeRepository {
  search(searchTerm: string) {
    return new Promise((resolve, reject) => {
      my.request({
        url: `${BASED_URL}/search${searchTerm ? `?${searchTerm}` : ''}`,
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
        dataType: 'json',
        success: (res: any) => {
          resolve(res);
        },
        fail: (_res: any) => {
          reject([]);
        },
      });
    });
  }

  getRecipeById(id: string) {
    return new Promise((resolve, reject) => {
      my.request({
        url: `${BASED_URL}/search?ids=${id}`,
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
        dataType: 'json',
        success: (res: any) => {
          resolve(res.recipes[0]);
        },
        fail: (_res: any) => {
          reject([]);
        },
      });
    });
  }
}

export default new RecipeRepository();
