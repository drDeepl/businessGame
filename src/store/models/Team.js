import {Model} from '@vuex-orm/core';
import Account from './Account';
console.warn('MODEL.TEAM');

export default class Team extends Model {
  static = 'teams';
  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(''),
      account_id: this.attr(null),
      account: this.belongsTo(Account, 'account_id')
    };
  }
}
