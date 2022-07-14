import {Model} from '@vuex-orm/core';
import Account from './Account';
import Team from './Team';
console.warn('MODEL.User');

export default class User extends Model {
  static entity = 'users';
  static fields() {
    return {
      id: this.attr(null),
      last_login: this.attr(''),
      username: this.attr(''),
      first_name: this.attr(''),
      last_name: this.attr(''),
      email: this.attr(''),
      data_joined: this.attr(''),
      role: this.attr(''),
      team_id: this.attr(null),
      team: this.belongsTo(Team, 'team_id'),
      account_id: this.attr(null),
      account: this.belongsTo(Account, 'account_id'),
      is_superuser: this.attr(false)
    };
  }
}
