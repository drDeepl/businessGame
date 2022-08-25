import UserService from '@/services/user.service';
import User from './models/User';
import {
  adminSidebarLinks,
  playerSidebarLinks,
  manufacturerSidebarLinks,
  customerSidebarLinks,
} from '@/_config';

export const user = {
  namespaced: true,
  state: {
    createUser: false,
    getUser: false,
    updateUser: {
      id: null,
      updating: false,
    },
    deleteUser: false,
    dataCurrentUser: null,
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
    async getUserDataByUsername(context, username) {
      console.warn('MODULE.USER: getUserByUsername');
      context.commit('SET_GET_USER');
      const responseWrap = await User.api().getUserByUsername(username);
      const user = responseWrap.response;

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
    async createUser(context, modelCreateUser) {
      console.warn('MODULE.USER: createUser');
      const responseWrap = await User.api().createUser(modelCreateUser);
      context.commit('SET_CREATED_USER');
      return responseWrap;
    },
    async updateUser(context, dataForUpdateUser) {
      console.warn('MODULE.USER: updateUser');
      console.error(dataForUpdateUser);
      const userId = dataForUpdateUser.userId;
      const userData = dataForUpdateUser.userData;
      await User.api().updateUser(userId, userData);
      context.commit('SET_USER_UPDATED');
    },
    async deleteUser(context, userId) {
      console.warn('MODULE.USER: deleteUser');
      const responseWrap = await User.api().deleteUser(userId);
      context.commit('SET_USER_DELETED');
      return responseWrap.response;
    },
  },
  getters: {
    GET_DATA_CURRENT_USER: (state) => {
      return state.dataCurrentUser;
    },
    GET_CREATE_USER: (state) => {
      console.warn('MODULE.USER: GET_CREATE_USER');
      return state.createUser;
    },
    GET_STATE_getUser: (state) => {
      return state.getUser;
    },
    GET_SIDEBAR_LINKS_BY_ROLE: (state) => (role) => {
      console.warn('MODULE.USER: GET_SIDEBAR_LINKS_BY_ROLE');
      const sidebarLinks = state.linksSidebarByRole[role];
      return sidebarLinks;
    },
    GET_USER_UPDATING: (state) => {
      console.warn('MODULE.USER: GET_USER_UPDATING');
      return state.updateUser.updating;
    },
    GET_USER_ID_ON_UPDATE: (state) => {
      console.warn('MODULE.USER: GET_USER_ID_ON_UPDATE');
      return state.updateUser.id;
    },
  },
  mutations: {
    SET_DATA_CURRENT_USER: function (state, userData) {
      state.dataCurrentUser = userData;
    },
    SET_CREATING_USER: function (state) {
      state.createUser = true;
    },
    SET_CREATED_USER: function (state) {
      state.createUser = false;
    },
    SET_GET_USER: function (state) {
      state.getUser = true;
    },
    SET_GET_USER_COMPLETE: function (state) {
      state.getUser = false;
    },
    SET_USER_UPDATING: function (state) {
      console.warn('MODULE.USER: stateUpdateUser');
      state.updateUser.updating = true;
    },
    SET_USER_ID_ON_UPDATING: function (state, userId) {
      console.warn('MODULE.USER: SET_USER_ID_UPDATING', userId);
      state.updateUser.id = userId;
    },
    SET_USER_INFO: function (state, userData) {
      console.warn('MODULE.USER: SET_USER_INFO');
      state.userInfo[userData.username] = userData;
    },
    SET_USERS_LIST: function (state, users) {
      console.warn('MODULE.USER: SET_USERS_LIST');
      state.arrays.users = users;
    },

    SET_USER_UPDATED: function (state) {
      state.updateUser.updating = false;
      state.updateUser.id = null;
    },
    SET_USER_DELETE: function (state) {
      console.warn('MODULE.USER: SET_USER_DELETE');
      state.deleteUser = true;
    },
    SET_USER_DELETED: function (state) {
      console.warn('MODULE.USER: SET_USER_DELETED');
      state.deleteUser = false;
    },
  },
};
