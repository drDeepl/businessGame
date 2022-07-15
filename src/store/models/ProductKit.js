import {Model} from '@vuex-orm/core';
import Product from './Product';
import {createAuthHeader} from '@/helpers/JWT.helper';

console.warn('MODEL.PRODUCT_KIT');

export default class ProductKit extends Model {
  static entity = 'productKits';
  static fields() {
    return {
      id: this.attr(null),
      product_id: this.hasMany(Product, 'id'),
      count: this.attr(null),
      time: this.attr(null),
    };
  }
  static apiConfig = {
    actions: {
      async createProductKit(productKit, jwt) {
        console.warn('STORE.MODEL.PRODUCT_KIT: createProductKit');
        const config = createAuthHeader(jwt);
        console.warn(config);
        return this.post('product-kits', productKit, config);
      },
      async getListProductKits(jwt) {
        console.warn('SOTE.MODEL.PRODUCT_KIT: getListProductKits');
        const config = createAuthHeader(jwt);
        return this.get('product-kits', config);
      },
    },
  };
}
