import Vue from 'vue';
import Vuex from 'vuex';

import {auth} from './module.auth';
import {user} from './module.user';
import {account} from './module.account';
import {team} from './module.team';
import {products} from './module.products';
import {productKit} from './module.productKit';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    account,
    team,
    products,
    productKit
  }
});
