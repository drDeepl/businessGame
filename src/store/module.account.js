import AccountService from '@/services/account.service';

export const account = {
  namespaced: true,
  state: {
    accountInfo: null
  },
  actions: {
    async getAccountById(context, id) {
      console.log('MODULE.ACCOUNT: getAccountById');
      const accountData = await AccountService.getAccount(id);
      context.commit('SET_ACCOUNT_INFO', accountData);
    }
  },
  getters: {
    GET_BALANCE: state => {
      return state.accountInfo.balance;
    }
  },
  mutations: {
    SET_ACCOUNT_INFO: (state, accountData) => {
      console.log('MODULE.ACCOUNT: SET_ACCOUNT_INFO');
      console.log(accountData);
      state.accountInfo = accountData;
    }
  }
};
