import UserService from '@/services/user.service';
import {isExist} from '@/services/utils.service';
export const user = {
  namespaced: true,
  state: {
    userInfo: {
      // 'username': userData,
    }
  },
  actions: {
    async getUserDataByUsName(context, username) {
      console.warn('MODULE.USER: getUserData');
      console.log(context, username + '\n______________');
      const userData = await UserService.getUserDataByUsername(username);
      context.commit('SET_USER_INFO', userData);
    }
  },
  getters: {
    GET_USER_INFO_BY_USERNAME: state => username => {
      console.warn('MODULE.USER: GET_USER_INFO_BY_USERNAME');
      const userData = state.userInfo[username];
      if (isExist(userData)) {
        return userData;
      } else {
        return false;
      }
    }
  },
  mutations: {
    SET_USER_INFO: function(state, userData) {
      console.warn('MODULE.USER: SET_USER_INFO');
      state.userInfo[userData.username] = userData;
    }
  }
};
