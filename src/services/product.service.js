import ProductAPI from '@/api/product.api';

class ProductService {
  async createProduct(name) {
    return await ProductAPI.createProduct(name);
  }
  async getListProducts() {
    const response = await ProductAPI.getProducts();
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error('Response status code ' + response.status);
    }
  }
}

export default new ProductService();
