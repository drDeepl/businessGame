import {Model} from '@vuex-orm/core';
import instance from '@/api/main';

export default class ProductStorage extends Model {
  static entity = 'products_storage';
  static fields() {
    return {
      product: this.attr(null),
      count: this.attr(null),
    };
  }
  static axios = instance;
  static apiConfig = {
    headers: {'Content-Type': 'application/json'},
    actions: {
      async getListProducts(team_id) {
        console.warn('MODEL.PRODUCT.STORAGE');
        return this.get('store/' + team_id + '/products/list');
      },
      async addProduct(StoreProduct) {
        return this.post('store/add-product', StoreProduct);
      },
      async getTeamProduct(teamProductId) {
        console.warn('OFFER.API: getTeamProduct');
        return this.get(`store/team-product/${teamProductId}`);
      },
    },
  };
}
