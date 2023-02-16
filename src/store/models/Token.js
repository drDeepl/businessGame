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
              console.log(status);
              errorState['in'] = 'response';
              errorState['status'] = status;
              errorState['message'] = exceptionMessage[status];
            } else if (error.request) {
              console.log(error.request);
              errorState['in'] = 'request';
              errorState['data'] = error.request;
              errorState['message'] = exceptionMessage[0];
            } else {
              errorState['in'] = null;
              errorState['data'] = error.message;
              errorState['message'] = exceptionMessage[0];
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
