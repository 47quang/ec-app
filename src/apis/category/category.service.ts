import categoryRepo from './category.repository';

class CategoryService {
  getAllCategories() {
    return new Promise((resolve, reject) => {
      categoryRepo
        .getAllCategories()
        .then((res) => {
          const { data } = res;
          if (data) resolve(data.data);
        })
        .catch((error) => reject(error));
    });
  }
}

export default new CategoryService();
