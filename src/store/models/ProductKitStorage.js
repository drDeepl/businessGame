import {Model} from '@vuex-orm/core';
import instance from '@/api/main';

export default class ProductKitStorage extends Model {
  static entity = 'productKits_storage';
  static fields() {
    return {
      product_kit: this.attr(''),
      count: this.attr(null),
    };
  }
  static axios = instance;
  static apiConfig = {
    headers: {'Content-Type': 'application/json'},
    actions: {
      async getListProductKitsStore(team_id) {
        console.warn('MODEL.PRODUCT.STORAGE');
        return this.get('store/' + team_id + '/product-kits/list');
      },

      async checkCreatedProductKits(team_id) {
        console.warn('MODEL.PRODUCT.STORAGE');
        return this.get('store/' + team_id + '/product-kits/check');
      },
    },
  };
}
