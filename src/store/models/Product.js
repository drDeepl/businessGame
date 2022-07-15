import {Model} from '@vuex-orm/core';
import {createAuthHeader} from '@/helpers/JWT.helper';
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
    actions: {
      async getListProducts(jwt) {
        console.warn('STORE.MODEL.PRODUCT: getListProduct');
        const config = createAuthHeader(jwt);
        return this.get('products', config);
      },
      async createProduct(data, jwt) {
        console.warn('STORE.MODEL.PRODUCT: createProduct');
        const config = createAuthHeader(jwt);
        return this.post('products', data, config);
      },
      async deleteProduct(id, jwt) {
        console.warn('STORE.MODEL.PRODUCT: deleteProduct');
        const config = createAuthHeader(jwt);
        config.delete = Number.parseInt(id);
        console.error(config);
        return this.delete('products/' + id, config);
      },
    },
  };
}
