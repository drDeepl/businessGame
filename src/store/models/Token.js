import {Model} from '@vuex-orm/core';
import instance from '@/api/main';
export default class Token extends Model {
  static entity = 'tokens';
  static fields() {
    return {
      refresh: this.attr(''),
      access: this.attr(''),
      username: this.attr(''),
    };
  }
  static axios = instance;
  static apiConfig = {
    headers: {},
    actions: {
      async pair(authData) {
        console.warn('MODELS.TOKEN: getAuth');
        return this.post('token/pair', authData);
      },
    },
  };
}
