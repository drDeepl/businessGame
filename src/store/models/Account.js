import {Model} from '@vuex-orm/core';
import {createAuthHeader} from '@/helpers/JWT.helper';

console.warn('MODEL.ACCOUNT');
export default class Account extends Model {
  static entity = 'accounts';
  static fields() {
    return {
      id: this.attr(null),
      is_unlimited: this.attr(false),
      balance: this.attr(null),
    };
  }
  static apiConfig = {
    actions: {
      async getListAccounts(jwt) {
        console.warn('MODEL.ACCOUNT: getListAccount');
        const config = createAuthHeader(jwt);
        return this.get('accounts', config);
      },
      async getAccount(accountId, jwt) {
        console.warn('MODEL.ACCOUNT: getAccount');
        const config = createAuthHeader(jwt);
        return this.get('accounts/' + accountId, config);
      },
      async getTransactions(accountId, jwt) {
        console.warn('MODEL.ACCOUNT: getTransactions');
        const config = createAuthHeader(jwt);
        return this.get('accounts/' + accountId + '/transactions', config);
      },
      async transferBetweenAccount(modelTransferAccount, jwt) {
        console.warn('MODEL.ACCOUNT: transferBetweenAccount');
        const config = createAuthHeader(jwt);
        return this.post('account/transfer', modelTransferAccount, config);
      },
      async absorbAccount(modelAbsorbAccount, jwt) {
        console.warn('MODEL.ACCOUNT: absorbAccount');
        const config = createAuthHeader(jwt);
        return this.post('accounts/absorb', modelAbsorbAccount, config);
      },
      async emitAccount(modelEmitAccount, jwt) {
        console.warn('MODEL.ACCOUNT: emitAccount');
        const config = createAuthHeader(jwt);
        return this.put('accounts/emit', modelEmitAccount, config);
      },
    },
  };
}
