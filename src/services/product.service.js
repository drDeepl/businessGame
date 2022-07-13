import ProductAPI from '@/api/product.api';

class ProductService {
  async createProduct(name) {
    const response = await ProductAPI.createProduct(name);
    return response.data;
  }
  async getListProducts() {
    const response = await ProductAPI.getProducts();
    if (response.status == 200) {
      return response.data;
    } else {
      throw new Error('Response status code ' + response.status);
    }
  }
  async deleteProduct(productId) {
    const response = await ProductAPI.deleteProduct(productId);
    if (response.status == 200) {
      return response.data;
    } else {
      throw new Error('Response Error. Status code ' + response.status);
    }
  }
}

export default new ProductService();
