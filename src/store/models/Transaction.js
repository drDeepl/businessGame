import {Model} from '@vuex-orm/core';
import TokenService from '@/services/token.service';

console.warn('MODEL.TRANSACTION');

export default class Transaction extends Model {
  static entity = 'transactions';
  static fields() {
    return {
      from_account: this.attr(null),
      to_account: this.attr(null),
      amount: this.attr(null),
      timestamp: this.attr(''),
    };
  }
  static apiConfig = {
    headers: {
      Authorization: TokenService.getLocalAccessToken(),
    },
    actions: {
      async getListTransactions() {
        console.warn('MODEL.TRANSACTION: getListTransactions');
        return this.get('transactions');
      },
      async getTransaction(transactionId) {
        console.warn('MODEL.TRANSACTION: getTransaction');
        return this.get('transactions/' + transactionId);
      },
    },
  };
}
