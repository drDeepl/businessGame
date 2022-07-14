import {Model} from '@vuex-orm/core';
console.warn('MODEL.ACCOUNT');
export default class Account extends Model {
  static entity = 'accounts';
  static fields() {
    return {
      id: this.attr(null),
      is_unlimited: this.attr(false),
      balance: this.attr(null)
    };
  }
}
