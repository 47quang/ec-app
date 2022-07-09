import categoryRepo from './category.repository';

class CategoryService {
  getAllCategories() {
    return new Promise((resolve, reject) => {
      categoryRepo
        .getAllCategories()
        .then((res) => {
          const { data } = res;
          console.log({ data });
          if (data) resolve(data.data);
        })
        .catch((error) => {
          console.log(error);
          reject([]);
        });
    });
  }
}

export default new CategoryService();
