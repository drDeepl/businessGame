import {Model} from '@vuex-orm/core';
import TokenService from '@/services/token.service';

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
    headers: {
      Authorization: TokenService.getLocalAccessToken(),
    },
    actions: {
      async getListAccounts() {
        console.warn('MODEL.ACCOUNT: getListAccount');

        return this.get('accounts');
      },
      async getAccount(accountId) {
        console.warn('MODEL.ACCOUNT: getAccount');

        return this.get('accounts/' + accountId);
      },
      async getTransactions(accountId) {
        console.warn('MODEL.ACCOUNT: getTransactions');

        return this.get('accounts/' + accountId + '/transactions');
      },
      async transferBetweenAccount(modelTransferAccount) {
        console.warn('MODEL.ACCOUNT: transferBetweenAccount');

        return this.post('account/transfer', modelTransferAccount);
      },
      async absorbAccount(modelAbsorbAccount) {
        console.warn('MODEL.ACCOUNT: absorbAccount');

        return this.post('accounts/absorb', modelAbsorbAccount);
      },
      async emitAccount(modelEmitAccount) {
        console.warn('MODEL.ACCOUNT: emitAccount');

        return this.put('accounts/emit', modelEmitAccount);
      },
    },
  };
}
