import UserService from '@/services/user.service';

import {
  adminSidebarLinks,
  playerSidebarLinks,
  manufacturerSidebarLinks,
  customerSidebarLinks,
} from '@/_config';

import User from './models/User';
export const user = {
  namespaced: true,
  state: {
    getUser: false,
    linksSidebarByRole: {
      // INFO: role: [{title: String, url: String,}]
      player: playerSidebarLinks,
      manufacturer: manufacturerSidebarLinks,
      customer: customerSidebarLinks,
      SUPERUSER: adminSidebarLinks,
    },
    arrays: {
      // INFO: [JSON User]
      usersById: {}, // INFO: idUsers: dataUsers
    },
  },
  actions: {
    async getUserByUsername(context, username) {
      console.warn('MODULE.USER: getUserByUsername');
      context.commit('SET_GET_USER');
      const response = await User.api().getUserByUsername(username);
      const user = response.response.data;
      context.commit('SET_GET_USER_COMPLETE');
      return user;
    },
    async getUser(context, userId) {
      console.warn('MODULE.user: getUser');
      const response = await User.api().getUser(userId);
      const user = response.response.data;
      console.warn(context);
      return user;
    },
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
    GET_STATE_getUser: (state) => {
      return state.getUser;
    },
    GET_SIDEBAR_LINKS_BY_ROLE: (state) => (role) => {
      console.warn('MODULE.USER: GET_SIDEBAR_LINKS_BY_ROLE');
      const sidebarLinks = state.linksSidebarByRole[role];
      return sidebarLinks;
    },
  },
  mutations: {
    SET_GET_USER: function (state) {
      state.getUser = true;
    },
    SET_GET_USER_COMPLETE: function (state) {
      state.getUser = false;
    },
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
