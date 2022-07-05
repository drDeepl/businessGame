import UserService from '@/services/user.service';
import {isExist} from '@/services/utils.service';
import {
  adminSidebarLinks,
  playerSidebarLinks,
  manufacturerSidebarLinks
} from '@/_config';

export const user = {
  namespaced: true,
  state: {
    userInfo: {
      // INFO: 'username': userData,
    },
    linksSidebarByRole: {
      // INFO: role: [{title: String, url: String,}]
      PLAYER: playerSidebarLinks,
      MANUFACTURER: manufacturerSidebarLinks,
      CUSTOMER: [],
      SUPERUSER: adminSidebarLinks
    },
    arrays: {
      // INFO: [JSON User]
      users: null,
      usersById: {} // INFO: idUsers: dataUsers
    }
  },
  actions: {
    async getUserDataByUsName(context, username) {
      console.warn('MODULE.USER: getUserData');
      console.log(context, username + '\n______________');
      const userData = await UserService.getUserDataByUsername(username);
      context.commit('SET_USER_INFO', userData);
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
      const updatedUser = await UserService.createUser(modelCreateUser);
      context.commit('SET_UPDATED_USER', updatedUser);
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
    },

    GET_SIDEBAR_LINKS_BY_ROLE: state => role => {
      console.warn('MODULE.USER: GET_SIDEBAR_LINKS_BY_ROLE');
      const sidebarLinks = state.linksSidebarByRole[role];
      return sidebarLinks;
    },
    GET_LIST_USERS: state => {
      console.warn('MODULE.USERS: GET_LIST_USERS');
      if (state.arrays.users == null) {
        return false;
      }
    }
  },
  mutations: {
    SET_USER_INFO: function(state, userData) {
      console.warn('MODULE.USER: SET_USER_INFO');
      state.userInfo[userData.username] = userData;
    },
    SET_USERS_LIST: function(state, users) {
      console.warn('MODULE.USER: SET_USERS_LIST');
      state.arrays.users = users;
    },
    SET_UPDATED_USER: function(state, updatedUser) {
      state.arrays.users.push(updatedUser);
    }
  }
};
