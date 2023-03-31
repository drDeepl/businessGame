<template>
  <Load v-if="$store.getters['user/GET_STATE_getUser']" />
  <div v-else :class="sidebar.className + ' mainLayout'" id="wrapper">
    <!-- <a href="#" id="menu-toggle"> -->

    <aside id="sidebar-wrapper" class="aside-sidebar">
      <div class="sidebar-container">
        <p id="sidebar-tittle" class="user-info">{{ title }}</p>
        <ul class="user-info" v-if="sidebarUserInfo.role.value == 'player'">
          <li
            :id="row"
            class="user-info-row"
            v-for="row in Object.keys(sidebarUserInfo).filter(
              (key) => key != 'balance'
            )"
            :key="row"
          >
            <div v-if="!!sidebarUserInfo[row].value">
              <span class="sidebar-user-info title">
                <small>
                  {{ sidebarUserInfo[row].title.toLowerCase() }}
                </small>
              </span>
              <span class="sidebar-user-info value" :id="row">
                {{ sidebarUserInfo[row].value.toLowerCase() }}
              </span>
            </div>
            <v-progress-circular v-else indeterminate></v-progress-circular>
          </li>
          <li id="balance" class="user-info-row">
            <div v-if="!stateBalanceRunning">
              <span class="sidebar-user-info title">
                <small> баланс </small>
              </span>
              <span class="sidebar-user-info value" id="balance">
                {{ balanceTeam }}
              </span>
            </div>
            <v-progress-circular v-else indeterminate></v-progress-circular>
          </li>
        </ul>
        <hr id="sideBarWrapper" />
      </div>
      <ul class="sidebar-nav">
        <li
          class="mainLayout-sidebar-row"
          v-for="key in sidebar.links"
          :key="key.url"
          @click.prevent="onClickTab"
        >
          <span @click="setActiveTab(key.title)">
            <router-link :to="key.url">
              <span class="mainLayout-sidebar-row-text">{{ key.title }}</span>
            </router-link>
          </span>
        </li>
        <li class="sidebar-logout mainLayout-sidebar-row">
          <a class="sidebar-link" href @click="OnLogOut">Выйти </a>
        </li>
      </ul>
    </aside>

    <!-- INFO: Page Content -->
    <div id="page-content-wrapper">
      <button class="toggle-button" @click.prevent="onClickMenu">
        <svg class="toggle-icon">
          <line class="toggle-line" x1="9" x2="27" y1="11" y2="11" />
          <line class="toggle-line" x1="11" x2="25" y1="18" y2="18" />
          <line class="toggle-line" x1="13" x2="23" y1="25" y2="25" />
        </svg>
      </button>
      <nav class="nav-bar"></nav>
      <div class="tb-container">
        <span class="tb">{{ activeTab }}</span>
      </div>
      <div class="wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="content-wrapper">
                <DialogAlert
                  v-if="alert.newOffer.active"
                  title="Предложение о покупке"
                  :active="alert.newOffer.active"
                >
                  <OfferProductKitCard
                    :title="alert.newOffer.offer"
                    :item="alert.newOffer.offer"
                    :modelItem="model.offerSale"
                  ></OfferProductKitCard>
                </DialogAlert>
                <DialogError
                  v-if="alert.error.active"
                  :title="alert.error.message"
                  :active="alert.error.active"
                >
                  <v-btn @click.prevent="onClickErrorClose" text>закрыть</v-btn>
                </DialogError>
                <router-view />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {app} from '@/_config';
import User from '@/store/models/User';

import OfferProductKitCard from '@/UI/OfferProductKitCard.vue';
import Load from '@/UI/Load.vue';
import DialogAlert from '@/UI/DialogAlert.vue';
import DialogError from '@/UI/DialogError.vue';
import OfferApi from '@/api/offer.api';

import SaleOffer from '@/models/model.offer.sale';
import {mapGetters} from 'vuex';

export default {
  components: {Load, DialogAlert, DialogError, OfferProductKitCard},
  data() {
    return {
      test: '',
      title: app.title,
      alert: {
        newOffer: {active: false, offer: null},
        error: {active: false, message: null},
      },
      model: {
        offerSale: SaleOffer,
      },
      arrays: {
        saleOffers: [],
        purchaseOffers: [],
      },
      loading: {
        main: this.$store.getters['mainLayout/LOADING'],
        sidebarUserInfo: true,
      },
      sidebarUserInfo: {
        username: {title: 'Имя пользователя', value: ''},
        role: {title: 'Роль', value: ''},
        team: {title: 'Команда', value: ''},
      },
      sidebar: {
        isActive: false,
        className: 'sidebar-container',
        template: 'Деловая игра',
        links: [],
      },
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
      isGetTeam: 'team/GET_TEAM_STATE',
      stateBalanceRunning: 'team/GET_BALANCE_STATE_RUNNING',
      balanceTeam: 'team/GET_BALANCE_VALUE',
      activeTab: 'mainLayout/GET_CURRENT_TAB',
      isOffersUpdate: 'shopState/GET_OFFERS_UPDATE_RUNNING',
      currentUserData: 'user/GET_CURRENT_USER_DATA',
    }),
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentTab() {
      return this.$route.params;
    },

    users() {
      return this.$store.$db().model('users').all();
    },
    sidebarLinks() {
      return this.$store.getters['user/GET_SIDEBAR_LINKS_BY_ROLE'](
        this.sidebarUserInfo.role
      );
    },
  },
  watch: {
    async 'alert.newOffer.offer'(offer) {
      // FIX: Добавить в оффер название продукта
      console.log('NEW OFFER SALE: ', offer);
      // TODO: Write on backend feature to getNameProduct on ProductKitId
      const response = await this.$store.dispatch(
        'productKit/getProductFromProductKit',
        offer.product_kit
      );

      if (response.error) {
        this.alert.error.active = true;
        this.alert.error.message = response.message;
      } else {
        const product = response.data;

        console.log('PRODUCT', product);
      }
    },
    async isProductsUpdate(productsUpdate) {
      if (productsUpdate) {
        await this.$store.dispatch('products/getProducts');
        this.$store.commit('products/SET_LIST_PRODUCT_UPDATE_COMPLETE');
      }
    },
  },
  async created() {
    this.connection = new WebSocket('ws://localhost:8000/ws/');
    this.connection.onmessage = () => {
      OfferApi.offersSale().then((response) => {
        // this.myJson_s = response.data;
        console.log('OFFERS SALE\n', response.data);
        console.log('USERS DATA\n', this.currentUserData);
        const currentUserTeam = this.currentUserData.team;
        const offer = response.data.pop();
        const offerToTeam = offer.team;

        if (currentUserTeam === offerToTeam) {
          console.log(
            `OFFER TO TEAM: ${offerToTeam}\nCURRENT USER TEAM: ${currentUserTeam}`
          );
          this.alert.newOffer.offer = offer;
          this.alert.newOffer.active = true;
          // this.arrays.saleOffers.push(offer);
        }
      });

      // OfferApi.offersPurchase().then((response) => {
      //   // this.myJson_p = response.data;
      //   console.log('OFFERS PURCHASE\n', response.data);
      // });
      // FIX: Как узнать о продаже оффера?
    };
    if (this.isLoggedIn) {
      const username = this.currentUser.username;
      const responseUser = await this.$store.dispatch(
        'user/getUserDataByUsername',
        username
      );

      const dataUser = responseUser.data;
      this.$store.commit('user/SET_CURRENT_USER_DATA', dataUser);
      const roleUser = dataUser.role.toLowerCase();

      await this.$store.dispatch('products/getProducts');
      await this.$store.dispatch('productKit/getProductKits');
      let sidebarLinks =
        this.$store.getters['user/GET_SIDEBAR_LINKS_BY_ROLE'](roleUser);

      if (dataUser.is_superuser) {
        console.warn('GET TEAMS');
        const teams = await this.$store.dispatch('team/getTeams');
        const adminRow = {title: 'Панель администратора', url: '/admin'};
        sidebarLinks.shift();
        sidebarLinks.push(adminRow);

        console.warn('LIST TEAMS\n', teams);
      }
      if (roleUser == 'player' && !dataUser.is_superuser) {
        console.warn(User.api());
        const teamId = dataUser.team;
        console.error('DATA USER\n', dataUser);
        this.$store.commit('team/SET_BALANCE_RUNNING');
        const dataTeam = await this.$store.dispatch('team/getDataTeam', teamId);
        const dataAccount = await this.$store.dispatch(
          'account/getAccountById',
          dataTeam.account
        );

        this.sidebarUserInfo.role.value = roleUser;

        this.sidebarUserInfo.username.value = username;
        this.sidebarUserInfo.team.value = dataTeam.name;
        // this.sidebarUserInfo.balance.value = dataAccount.balance;
        this.$store.commit('team/SET_BALANCE', dataAccount.balance);
        this.$store.commit('team/SET_BALANCE_RUNNING_COMPLETE');
      }
      this.sidebar.links = sidebarLinks;
    } else {
      this.$router.push('/');
    }
  },

  methods: {
    onClickErrorClose() {
      this.alert.error.active = false;
      this.alert.error.message = null;
    },
    async onClickMenu() {
      this.sidebar.isActive = !this.sidebar.isActive;

      if (this.sidebar.isActive) {
        console.warn('MAINLAYOUT: onClickMenu');
        this.sidebar.className = 'menuDisplayed';
      } else {
        this.sidebar.className = '';
      }
    },

    onClickTab() {
      this.sidebar.className = 'sidebar-container';
      this.sidebar.isActive = !this.sidebar.isActive;
    },
    setActiveTab(title) {
      this.$store.commit('mainLayout/SET_CURRENT_TAB', title);
    },
    OnLogOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
    onMyProfile() {
      this.$router.push('/profile');
    },
  },
};
</script>
