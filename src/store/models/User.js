import {Model} from '@vuex-orm/core';
import {createAuthHeader} from '@/helpers/JWT.helper';

console.warn('MODEL.USER');

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
      team: this.attr(null),
      account: this.attr(null),
      is_superuser: this.attr(false),
    };
  }
  static apiConfig = {
    actions: {
      async getListUsers(jwt) {
        console.warn('MODEL.USER: getListUsers');
        const config = createAuthHeader(jwt);
        return this.get('users', config);
      },
      async createUser(modelCreateUser, jwt) {
        console.warn('MODEL.USER: createsUser');
        const config = createAuthHeader(jwt);
        return this.post('users', modelCreateUser, config);
      },
      async getUser(userId, jwt) {
        console.warn('MODEL.USER: createUser');
        const config = createAuthHeader(jwt);
        return this.get('users/' + userId, config);
      },
      async updateUser(userId, data, jwt) {
        console.warn('MODEL.USER: updateUser');
        const config = createAuthHeader(jwt);
        return this.post('users/' + userId, data, config);
      },
      async deleteUser(userId, jwt) {
        const config = createAuthHeader(jwt);
        config.delete = Number.parseInt(userId);
        return this.delete('users/' + userId, config);
      },
      async getRoles(jwt) {
        console.warn('MODEL.USER: getRules');
        const config = createAuthHeader(jwt);
        return this.get('roles', config);
      },
    },
  };
}
