import {Model} from '@vuex-orm/core';
import Product from './Product';
console.warn('MODEL.PRODUCT_KIT');

export default class ProductKit extends Model {
  static entity = 'productKits';
  static fields() {
    return {
      id: this.attr(null),
      product: this.attr(null),
      product_r: this.belongsTo(Product, 'product_id'),
      count: this.attr(null),
      time: this.attr(null)
    };
  }
}
