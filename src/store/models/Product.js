import {Model} from '@vuex-orm/core';
console.warn('MODEL.Product');

export default class Product extends Model {
  static entity = 'products';
  static fields() {
    return {
      id: this.attr(null),
      name: this.attr('')
    };
  }
}
