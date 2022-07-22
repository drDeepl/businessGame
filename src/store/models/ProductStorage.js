import {Model} from '@vuex-orm/core';
import instance from '@/api/main';

export default class ProductStorage extends Model {
  static entity = 'products_storage';
  static fields() {
    return {
      product: this.attr({}),
      count: this.attr(null),
    };
  }
  static axios = instance;
  static apiConfig = {
    headers: {'Content-Type': 'application/json'},
    actions: {
      async getListProducts(team_id) {
        console.warn('MODEL.PRODUCT.STORAGE');
        this.get('store/' + team_id + '/products/list');
      },
    },
  };
}
