import UserService from '@/services/user.service';
export const user = {
  namespaced: true,
  state: {
    // userInfo: {
    //   'username': userData,
    // }
    userInfo: {}
  },
  actions: {
    async getUserDataByUsName(context, username) {
      console.log('MODULE.USER: getUserData');
      console.log(context, username + '\n______________');
      const userData = await UserService.getUserDataByUsername(username);
      context.commit('SET_USER_INFO', userData);
    }
  },
  getters: {
    GET_USER_INFO_BY_USERNAME: state => username => {
      console.log(username);
      return state.userInfo[username];
    }
  },
  mutations: {
    SET_USER_INFO: function(state, userData) {
      state.userInfo[userData.username] = userData;
    }
  }
};
