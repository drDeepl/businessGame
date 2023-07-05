// import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import VuexORMAxios from '@vuex-orm/plugin-axios';
import User from './models/User';
import Team from './models/Team';
import Account from './models/Account';
import Product from './models/Product';
import ProductKit from './models/ProductKit';
import Token from './models/Token';

// import OfferSale from './models/OfferSale';
// import OfferPurchase from './models/OfferPurchase';
import {auth} from './module.auth';
import {user} from './module.user';
import {account} from './module.account';
import {team} from './module.team';
import {products} from './module.products';
import {productKit} from './module.productKit';
import {mainLayout} from './module.main.layout';
import {offer} from './module.offer';
import {shopState} from './module.shop.state';
import {storageTeam} from './module.storage.team';
import {admin} from './module.admin';
import {customer} from './module.customer';
import {profile} from './module.profile';
import instance from '@/api/main';
import ProductKitStorage from '@/store/models/ProductKitStorage';
import ProductStorage from '@/store/models/ProductStorage';

const userInfo = localStorage.getItem('user');
if (userInfo) {
  console.warn('TOKEN EXIST');
  instance.defaults.headers.common['Authorization'] = userInfo.access;
}

Vue.use(Vuex);
VuexORM.use(VuexORMAxios, {axios: instance});

// INFO: create a new instance of Database
const database = new VuexORM.Database();

// INFO: Register model to Database
database.register(ProductKitStorage);
database.register(ProductStorage);
database.register(Token);
database.register(User);
database.register(Team);
database.register(Account);
database.register(Product);
database.register(ProductKit);
// database.register(OfferSale);
// database.register(OfferPurchase);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    account,
    team,
    products,
    productKit,
    mainLayout,
    offer,
    shopState,
    storageTeam,
    admin,
    customer,
    profile,
  },
  plugins: [VuexORM.install(database)],
});
