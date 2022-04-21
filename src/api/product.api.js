import instance from 'main';

class productAPI {
  createProduct(name) {
    return instance.post('products', name);
  }

  getAllProducts() {
    return instance.get('products');
  }

  updateProduct(productId) {
    instance.put('products/' + productId);
  }

  deleteProduct(productId) {
    instance.delete('products/' + productId);
  }
}
