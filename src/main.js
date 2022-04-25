import Vue from 'vue';
import App from './App.vue';
import {router} from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/scss/main.scss';
import VeeValidate from 'vee-validate';
import Vuex from 'vuex';
import {library} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faWarehouse,
  faShoppingCart,
  faTag,
  faAddressCard,
  faUsers,
  faArrowAltCircleRight
} from '@fortawesome/free-solid-svg-icons';
import MainLayout from './layouts/MainLayout.vue';
import setupInterceptors from './services/setupInterceptors';

library.add(
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faWarehouse,
  faShoppingCart,
  faTag,
  faAddressCard,
  faUsers,
  faArrowAltCircleRight
);

Vue.config.productionTip = false;

Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Vuex);

Vue.use(MainLayout);

setupInterceptors(store);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
