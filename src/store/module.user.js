import UserService from '@/services/user.service';
export const user = {
  namespaced: true,
  state: [],
  actions: {
    async getUserDataByUsName(context, username) {
      console.log('MODULE.USER: getUserData');
      console.log(context, username + '\n______________');
      const userData = await UserService.getUserDataByUsername(username);
      // TODO: Добавить данные в state
      console.log(userData);
    }
  },
  getters: {},
  mutations: {}
};
