import instance from './main';

class ProductAPI {
  createProduct(name) {
    return instance.post('products', name);
  }

  getProducts() {
    return instance.get('products');
  }

  updateProduct(productId) {
    instance.put('products/' + productId);
  }

  deleteProduct(productId) {
    instance.delete('products/' + productId);
  }
}

export default new ProductAPI();
