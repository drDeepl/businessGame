import UserService from '@/services/user.service';
import {isExist} from '@/services/utils.service';
import {
  adminSidebarLinks,
  playerSidebarLinks,
  manufacturerSidebarLinks,
} from '@/_config';

export const user = {
  namespaced: true,
  state: {
    updateUser: {}, // NOTE: {userId: status}
    userInfo: {
      // INFO: 'username': userData,
    },
    linksSidebarByRole: {
      // INFO: role: [{title: String, url: String,}]
      player: playerSidebarLinks,
      manufacturer: manufacturerSidebarLinks,
      customer: [],
      SUPERUSER: adminSidebarLinks,
    },
    arrays: {
      // INFO: [JSON User]
      usersById: {}, // INFO: idUsers: dataUsers
    },
  },
  actions: {
    // async getUserDataByUsName(context, username) {
    //   console.warn('MODULE.USER: getUserData');
    // await User.api()
    // },
    async getRolesUser(context) {
      const roles = await UserService.getRoles();
      console.log(context);
      return roles;
    },
    async getUsers(context) {
      const users = await UserService.getUsersList();
      context.commit('SET_USERS_LIST', users);

      return users;
    },
    async createUser(context, newUser) {
      console.warn('MODULE.USER: createUser');
      const user = await UserService.createUser(newUser);
      console.error(user, context);
      context.commit('SET_USER_INFO', user);
    },
    async updateUser(context, dataForUpdateUser) {
      // [08.07.2022] TODO: UserService.updateDataUser(user_id, updatedUser);
      console.error(dataForUpdateUser);
      console.log(context);
      await UserService.updateDataUser(
        dataForUpdateUser.userId,
        dataForUpdateUser.data
      );
      context.commit('SET_USER_INFO', dataForUpdateUser.data);
    },
    userToUpdate(context, id) {
      console.warn('MODULE.USER: userToUpdate');
      context.commit('SET_STATE_USER_UPDATE', id);
    },
    stateUpdatedUser(context, userId) {
      console.warn('MODULE.USER: stateUpdatedUser');
      context.commit('SET_STATE_USER_UPDATED', userId);
    },
  },
  getters: {
    GET_USER_INFO_BY_USERNAME: (state) => (username) => {
      console.warn('MODULE.USER: GET_USER_INFO_BY_USERNAME');
      const userData = state.userInfo[username];
      if (isExist(userData)) {
        return userData;
      } else {
        return false;
      }
    },

    GET_SIDEBAR_LINKS_BY_ROLE: (state) => (role) => {
      console.warn('MODULE.USER: GET_SIDEBAR_LINKS_BY_ROLE');
      const sidebarLinks = state.linksSidebarByRole[role];
      return sidebarLinks;
    },
    GET_LIST_USERS: (state) => {
      console.warn('MODULE.USERS: GET_LIST_USERS');
      return state.arrays.users;
    },
    GET_USER_ID_UPDATE: (state) => {
      console.warn('MODULE.USER: GET_USER_ID_UPDATE');
      for (let userId in state.updateUser) {
        if (state.updateUser[userId] == 'UPDATE') {
          return userId;
        }
      }
    },
  },
  mutations: {
    // FIX: ?????????????????????? ?????? ??????????????
    STATE_UPDATE_USER: function (state, userId) {
      console.warn('MODULE.USER: stateUpdateUser');
      state.updateUser[userId] = 'UPDATE';
    },
    SET_USER_INFO: function (state, userData) {
      console.warn('MODULE.USER: SET_USER_INFO');
      state.userInfo[userData.username] = userData;
    },
    SET_USERS_LIST: function (state, users) {
      console.warn('MODULE.USER: SET_USERS_LIST');
      state.arrays.users = users;
    },
    SET_STATE_USER_UPDATE: function (state, userId) {
      console.warn('MODULE.USER: SET_STATE_USER_UPDATE');
      console.warn(userId);
      state.updateUser[userId] = 'UPDATE';
    },
    SET_STATE_USER_UPDATED: function (state, userId) {
      state.updateUser[userId] = 'UPDATED';
    },
  },
};
