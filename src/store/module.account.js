import AccountService from '@/services/account.service';
import {isExist} from '@/services/utils.service';
// TODO: Сделатть хранилище счетов
export const account = {
  namespaced: true,
  state: {
    accInfo: {
      // team: data
    }
  },
  actions: {
    async getAccountById(context, modelAccount) {
      // modelAccount состоит из
      // {username: string,
      //  accountId: Integer}
      console.warn('MODULE.ACCOUNT: getAccountById');
      const accountId = modelAccount.accountId;
      const accountData = await AccountService.getAccount(accountId);
      const modelAccInfo = {
        username: modelAccount.username,
        accountData: accountData
      };
      context.commit('SET_ACCOUNT_INFO', modelAccInfo);
    }
  },
  getters: {
    GET_ACC_INFO_BY_UsName: state => username => {
      const accountData = state.accInfo[username];
      if (isExist(accountData)) {
        return accountData;
      } else {
        console.error('ACCOUNT DATA IS NOT EXIST IN STORE');
        return false;
      }
    }
  },
  mutations: {
    SET_ACCOUNT_INFO: (state, modelAccInfo) => {
      console.warn('MODULE.ACCOUNT: SET_ACCOUNT_INFO');
      state.accInfo[modelAccInfo.username] = modelAccInfo.accountData;
    }
  }
};
