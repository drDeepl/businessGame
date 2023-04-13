import Account from './models/Account';
import {decorateResponseApi} from '@/services/utils.service';
export const account = {
  namespaced: true,
  state: {
    getAccount: false,
  },
  actions: {
    async getAccountById(context, accountId) {
      console.warn('MODULE.ACCOUNT');
      context.commit('SET_GET_ACCOUNT');
      const response = await decorateResponseApi(
        Account.api().getAccount,
        accountId
      );
      // const responseWrap = await Account.api().getAccount(accountId);
      // context.commit('SET_GET_ACCOUNT_COMPLETE');
      // const data = responseWrap.response.items
      //   ? responseWrap.response.items.data
      //   : responseWrap.response.data;
      return response;
    },
  },
  getters: {
    GET_STATE_getAccount: (state) => {
      return state.getAccount;
    },
  },
  mutations: {
    SET_GET_ACCOUNT: function (state) {
      state.getAccount = true;
    },
    SET_GET_ACCOUNT_COMPLETE: function (state) {
      state.getAccount = false;
    },
  },
};
