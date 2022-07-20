import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import VuexORMAxios from '@vuex-orm/plugin-axios';
import User from './models/User';
import Team from './models/Team';
import Account from './models/Account';
import Product from './models/Product';
import ProductKit from './models/ProductKit';
import Offer from './models/Offer';
import Transaction from './models/Transaction';
import {auth} from './module.auth';
import {user} from './module.user';
import {account} from './module.account';
import {team} from './module.team';
import {products} from './module.products';
import {productKit} from './module.productKit';

Vue.use(Vuex);
VuexORM.use(VuexORMAxios, {
  axios,
  headers: {'Content-Type': 'application/json'},
  baseURL: 'https://api.economic.fisting.tech/api/',
});
// INFO: create a new instance of Database
const database = new VuexORM.Database();

// INFO: Register model to Doatabase
database.register(User);
database.register(Team);
database.register(Account);
database.register(Product);
database.register(ProductKit);
database.register(Offer);
database.register(Transaction);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    account,
    team,
    products,
    productKit,
  },
  plugins: [VuexORM.install(database)],
});
