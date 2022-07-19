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
      async createProduct(data) {
        console.warn('STORE.MODEL.PRODUCT: createProduct');

        return this.post('products', data);
      },
      async deleteProduct(id) {
        console.warn('STORE.MODEL.PRODUCT: deleteProduct');

        return this.delete('products/' + id, {delete: Number.parseInt(id)});
      },
    },
  };
}
