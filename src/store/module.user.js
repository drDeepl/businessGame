import UserService from '@/services/user.service';
export const user = {
  namespaced: true,
  state: {
    // datasUser: {
    //   userId: String,
    //    data: Object
    //   }
    dataUsers: {}
  },
  actions: {
    async getUserDataByUsName(context, username) {
      console.log('MODULE.USER: getUserData');
      console.log(context, username + '\n______________');
      const userData = await UserService.getUserDataByUsername(username);
      context.commit('SET_USER_DATA', userData);
      return userData;
    }
  },
  getters: {},
  mutations: {
    SET_USER_DATA(state, userData) {
      state.dataUsers.userId = userData.id;
      state.dataUsers.userData = userData;
    }
  }
};
