const BASED_URL = 'https://b70598b4-4bb2-48d8-abdd-6049b6bce6c6.mock.pstmn.io';

class CategoryRepository {
  getAllCategories() {
    return new Promise((resolve, reject) => {
      my.request({
        url: `${BASED_URL}/categories`,
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
        dataType: 'json',
        success: (res: any) => {
          resolve(res.data);
        },
        fail: (_res: any) => {
          reject([]);
        },
      });
    });
  }
}

export default new CategoryRepository();
