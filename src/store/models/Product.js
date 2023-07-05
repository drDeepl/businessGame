import {Model} from '@vuex-orm/core';
import TokenService from '@/services/token.service';
console.warn('MODEL.Product');

export default class Product extends Model {
  static entity = 'products';
  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(''),
    };
  }
  static apiConfig = {
    headers: {
      Authorization: TokenService.getLocalAccessToken(),
    },
    actions: {
      async getListProducts() {
        console.warn('STORE.MODEL.PRODUCT: getListProduct');

        return this.get('products');
      },
      async getProduct(productId) {
        console.warn('STORE.MODEL.PRODUCT: getProduct');
        return this.get('products/' + productId);
      },
      async createProduct(data) {
        console.warn('STORE.MODEL.PRODUCT: createProduct');

        return this.post('products', data);
      },
      async setStateDeletedProduct(productId) {
        console.warn('MODULE.MODEL.PRODUCT: setStateDeletedProduct');
        return this.get(`products/delete/${productId}`);
      },
      async deleteProduct(id) {
        console.warn('STORE.MODEL.PRODUCT: deleteProduct');

        return this.delete('products/' + id, {delete: id});
      },
      async deleteProducts(flag) {
        return this.delete('products/all/' + flag);
      },
    },
  };
}
