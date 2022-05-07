import Vue from 'vue';
import Vuex from 'vuex';

import {auth} from './auth.module';

Vue.use(Vuex);

// Vuex.Store есть некоторая база знаний приложения
export default new Vuex.Store({
  modules: {
    auth
  }
});
