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
      console.log('Module.Auth.Login');
      const resp = await AuthService.login(user).catch(err => err.response);
      if (resp.status == 200) {
        context.commit('loginSuccess', user);
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
    }
  },
  getters: {
    initState: state => {
      return state;
    }
  },
  mutations: {
    loginSuccess(state, user) {
      console.log('module.auth.LoginSucces');
      console.log(user);
      state.status.loggedIn = true;
      state.user = user;
    },
    loginFailure(state) {
      console.log('module.auth.LoginFailure');
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
    }
  }
};