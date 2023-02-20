import {Model} from '@vuex-orm/core';
import instance from '@/api/main';
import {LoginException} from '@/exceptions/LoginException';
import {exceptionMessage} from '@/models/model.exception.message';

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
        const response = await this.post('token/pair', authData).catch(
          function (error) {
            let errorState = {};
            if (error.response) {
              console.log(error.response.status);
              let status = error.response.status;
              console.log(`TOKEN.PAIR.Response\n ${status}`);
              errorState['in'] = 'response';
              errorState['status'] = status;
              errorState['message'] = exceptionMessage[status];
            } else if (error.request) {
              console.log(`Bad request: ${error.request}`);
              errorState['in'] = 'request';
              errorState['data'] = error.request;
              errorState['message'] = 'Что-то пошло не так';
            } else {
              errorState['in'] = null;
              errorState['data'] = error.message;
              errorState['message'] = 'Что-то пошло не так';
            }
            return errorState;
          }
        );
        if (response['in']) {
          throw new LoginException(response.message, response.status);
        } else {
          return response;
        }
      },
    },
  };
}
