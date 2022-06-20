import Vue from 'vue';
import Vuex from 'vuex';

import {auth} from './module.auth';
import {user} from './module.user';
import {account} from './module.account';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    account
  }
});
