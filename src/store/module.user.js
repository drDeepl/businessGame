import UserService from '@/services/user.service';
export const user = {
  namespaced: true,
  state: {
    userInfo: null
  },
  actions: {
    async getUserDataByUsName(context, username) {
      console.log('MODULE.USER: getUserData');
      console.log(context, username + '\n______________');
      const userData = await UserService.getUserDataByUsername(username);
      context.commit('SET_USERINFO', userData);
      return;
    }
  },
  getters: {
    GET_USER_INFO: state => {
      return state.userInfo;
    },
    SIDEBAR_USER_INFO: state => {
      console.error(state);
    }
  },
  mutations: {
    SET_USERINFO: (state, payload) => {
      state.userInfo = payload;
    }
  }
};
