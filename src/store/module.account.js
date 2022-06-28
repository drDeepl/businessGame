import AccountService from '@/services/account.service';
export const account = {
  namespaced: true,
  state: {
    dataByIdTeam: {
      // idTeam: dataAccount
    }
  },
  actions: {
    async getAccountById(context, model) {
      // getAccountById получает на  вход объект model
      // model = {idAccount: Integer, idTeam: Integer}\
      // По idAccount получает данные о счете\
      // Создает модель для хранения данных dataAccountByIdTeam
      // После сохраняет данные в state в виде {idTeam:dataAccount}\
      console.warn('MODULE.ACCOUNT: getAccountById');
      console.log(model);
      console.log('Context\n', context);
      const dataAccount = await AccountService.getAccount(model.idAccount);
      console.log(dataAccount);
      const setAccountData = {
        idTeam: model.idTeam,
        dataAccount: dataAccount
      };
      context.commit('SET_ACCOUNT_DATA', setAccountData);
    }
  },
  getters: {
    GET_DATA_BY_ID_TEAM: state => idTeam => {
      return state.dataByIdTeam[idTeam];
    }
  },
  mutations: {
    SET_ACCOUNT_DATA: (state, data) => {
      console.warn('MODULE.ACCOUNT: SET_ACCOUNT_DATA');
      console.log(state);
      console.log(data);
      state.dataByIdTeam[data.idTeam] = data.dataAccount;
    }
  }
};
