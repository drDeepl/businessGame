import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';

Vue.use(Vuex);

// Vuex.Store есть некоторая база знаний приложения
export default new Vuex.Store({
  modules: {
    auth
  },
  // state хранит переменные, объекты, массивы и т.п
  state: {
    userInfo:{
      id: '',
      username: '',
      team: '',
      balance: '',
    }
  },
  
  // mutation меняет данные в state(они синхронны)
  mutation:{},
  
  // то же, что и mutation только асинхронны
  actions: {},
  
  // короткий путь для получения данных из state 
  getters: {},


});
