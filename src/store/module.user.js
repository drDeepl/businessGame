import UserService from '@/services/user.service';
export const user = {
  namespaced: true,
  state: [],
  actions: {
    async getUserInfo(context, userId) {
      console.log('MODULE.USER: getUserInfo');
      const responseUserData = await UserService.getUserInfo(userId).catch(
        err => err.response
      );
      if (responseUserData == 200) {
        // TODO: Сделать добавление данных пользователя в STATE
        context.commit('getUserInfoSuccess', userInfo);
      } else {
        context.commit('getUserInfoFail');
      }
    }
  },
  getters: {},
  mutations: {
    getUserInfoSuccess(state, userInfo) {
      console.log('MODULE.USER.LoginSucces');
      console.log(userInfo);
      state.userInfo.user = userInfo;
    },
    getUserInfoFail(state) {
      console.log(state);
    }
  }
};
