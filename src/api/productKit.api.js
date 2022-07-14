import instance from '@/api/main';

class ProductKitAPI {
  filename = 'ProductKitAPI.API: ';
  subdomain = 'product-kits';
  createProductKit(productKit) {
    console.warn(this.filename, 'createProductKit');
    console.warn(productKit);
    return instance.post(this.subdomain, productKit);
  }
  getProductKits() {
    console.warn(this.filename, 'getProductKits');
    return instance.get(this.subdomain);
  }
  getProductKit(productKitId) {
    console.warn(this.filename, 'getProductKit');
    return instance.get(this.subdomain + '/' + productKitId);
  }
  updateProductKit(productKitId, updatedProductKit) {
    console.warn(this.filename, 'updateProductKit');
    return instance.put(this.subdomain + '/' + productKitId, updatedProductKit);
  }
  deleteProductKit(productKitId) {
    console.warn(this.filename, 'deleteProductKit');
    return instance.delete(this.subdomain + '/' + productKitId);
  }
}

export default new ProductKitAPI();
