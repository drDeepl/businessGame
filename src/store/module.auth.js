import AuthService from '@/services/auth.service';
import {UserNotFound} from '@/errors/auth.errors';
const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
  ? {status: {loggedIn: true}, user}
  : {status: {loggedIn: false}, user: null};

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    async login(context, user) {
      console.warn('Module.Auth.Login');
      const resp = await AuthService.login(user);
      if (resp.status == 200) {
        const userToken = resp.data;
        await context.commit('loginSuccess', userToken);
        return userToken;
      } else {
        context.commit('loginFailure');
        throw new UserNotFound('Status Code: ' + resp.status);
      }
    },
    logout({commit}) {
      AuthService.logout();
      commit('logout');
    },
    refresh({commit}, access) {
      commit('refresh', access);
    },
  },
  getters: {
    initState: (state) => {
      return state;
    },
    isLoggedIn: (state) => {
      return state.status.loggedIn;
    },
    getToken: (state) => {
      return 'Bearer ' + state.user.acces;
    },
    GET_USER_NAME: (state) => {
      return state.user.username;
    },
  },
  mutations: {
    loginSuccess(state, user) {
      console.warn('MODULE.AUTH: loginSucces');
      console.log(user);
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      console.log('MODULE.AUTH: LoginFailure');
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    refresh(state, access) {
      state.status.loggedIn = true;
      state.user = {...state.user, access: access};
    },
  },
};
