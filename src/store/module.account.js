import Account from './models/Account';
export const account = {
  namespaced: true,
  state: {
    getAccount: false,
  },
  actions: {
    async getAccountById(context, accountId) {
      console.warn('MODULE.ACCOUNT');
      context.commit('SET_GET_ACCOUNT');
      const responseWrap = await Account.api().getAccount(accountId);
      context.commit('SET_GET_ACCOUNT_COMPLETE');
      return responseWrap.response.data;
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
