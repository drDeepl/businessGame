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
            <div v-if="!render.balance && !isRenderBalance">
              <span class="sidebar-user-info title">
                <small> баланс </small>
              </span>
              <span class="sidebar-user-info value" id="balance">
                {{ teamBalance.value }}.00
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
          v-for="rowModel in sidebar.links"
          :key="rowModel.url"
          @click.prevent="
            () =>
              rowModel.url == 'player'
                ? onClickTab(rowModel, {
                    offersAwaited: arrays.offersAwaited,
                    toUpdateOffersBadge: updateOffersAwaitedCount,
                  })
                : onClickTab(rowModel)
          "
        >
          <!-- <router-link :to="rowModel.url"> -->
          <span
            v-if="rowModel.url == 'player'"
            class="mainLayout-sidebar-row-text sidebar-link"
          >
            <v-badge
              :content="offersAwaitedCount"
              :value="offersAwaitedCount > 0"
              color="red"
            >
              {{ rowModel.title }}
            </v-badge>
          </span>
          <span v-else class="mainLayout-sidebar-row-text">
            {{ rowModel.title }}
          </span>
          <!-- </router-link> -->
        </li>
        <li class="mainLayout-sidebar-row">
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
                <v-dialog
                  v-if="alert.newOfferSale.active"
                  :value="alert.newOfferSale.active"
                  persistent
                  max-width="20em"
                >
                  <OfferCard
                    :item="alert.newOfferSale.offer"
                    :modelItem="model.offerSale"
                    :propsItemToShow="
                      Object.keys(model.offerSale.props).filter(
                        (item) => !model.offerSale.hideShow[item]
                      )
                    "
                    :isSucces="alert.success.active"
                    :successApply="onClickNewOfferCancel"
                  >
                    <v-btn
                      class="btn-apply"
                      @click="onClickNewOfferApply"
                      :loading="alert.load.newOffer"
                    >
                      Принять
                    </v-btn>

                    <v-btn
                      class="btn-cancel"
                      @click="
                        () => {
                          newOfferSaleToAwait(alert.newOfferSale.offer.id);
                          addOfferSaleToAwaitedList(alert.newOfferSale.offer);
                          onClickNewOfferCancel();
                        }
                      "
                      :disabled="alert.load.newOffer"
                    >
                      Отклонить
                    </v-btn>
                  </OfferCard>
                </v-dialog>
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

import OfferCard from '@/UI/OfferCard.vue';
import Load from '@/UI/Load.vue';

import DialogError from '@/UI/DialogError.vue';
import OfferApi from '@/api/offer.api';

import SaleOffer from '@/models/model.offer.sale';
import {mapGetters} from 'vuex';

export default {
  components: {Load, DialogError, OfferCard},
  data() {
    return {
      render: {balance: false},
      connection: null,
      title: app.title,
      alert: {
        newOfferSale: {
          active: false,
          offer: null,
          count: 0,
        },
        newOfferPurchase: {
          active: false,
          offer: null,
        },

        success: {active: false, message: null},
        error: {active: false, message: null},
        load: {newOffer: false, success: false, error: false},
      },
      model: {
        offerSale: SaleOffer,
      },
      arrays: {
        saleOffers: [],
        purchaseOffers: [],
        offersAwaited: [],
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

      balanceTeam: 'team/GET_BALANCE_VALUE',
      activeTab: 'mainLayout/GET_CURRENT_TAB',
      isOffersUpdate: 'shopState/GET_OFFERS_UPDATE_RUNNING',
      // currentUserData: 'user/GET_CURRENT_USER_DATA',
    }),
    currentUserData() {
      return this.$store.state.user.currentUserData;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentTab() {
      return this.$route.params;
    },
    teamBalance() {
      return this.$store.state.team.getBalance;
    },
    isRenderBalance() {
      return this.$store.state.team.getBalance.running;
    },

    users() {
      return this.$store.$db().model('users').all();
    },
    sidebarLinks() {
      return this.$store.getters['user/GET_SIDEBAR_LINKS_BY_ROLE'](
        this.sidebarUserInfo.role
      );
    },
    offersAwaitedCount() {
      return this.$store.state.mainLayout.countAwaitedOffers;
    },
  },
  watch: {
    async 'alert.newOfferSale.offer'(offer) {
      // FIX: Добавить в оффер название продукта
      console.log('NEW OFFER SALE: ', offer);
      if (offer) {
        const response = await this.$store.dispatch(
          'productKit/getProductFromProductKit',
          offer.product_kit
        );
        const trader = await this.$store.dispatch('user/getUser', offer.trader);

        if (response.error) {
          this.alert.error.active = true;
          this.alert.error.message = response.message;
        } else {
          const product = response.data;
          this.alert.newOfferSale.offer.product_kit = product.name;
          this.alert.newOfferSale.offer.trader = trader.username;
          this.alert.newOfferSale.active = true;
          console.log('PRODUCT', product);
        }
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
    if (this.isLoggedIn) {
      // INFO: Work of WebSockets ====================================================
      this.render.balance = true;
      this.connection = new WebSocket('ws://localhost:8000/ws/');
      // INFO: ============================================================================= END
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
        const adminRow = {title: 'Панель администратора', url: 'admin'};
        sidebarLinks.shift();
        sidebarLinks.push(adminRow);

        console.warn('LIST TEAMS\n', teams);
      }

      if (roleUser == 'player' && !dataUser.is_superuser) {
        // INFO: websocket for SaleOffers
        this.connection.onmessage = () => {
          OfferApi.offersSale().then((response) => {
            console.log('OFFERS SALE\n', response.data);
            console.log('USERS DATA\n', this.currentUserData);
            const currentUserTeam = this.currentUserData.team;
            const offer = response.data.at(-1);
            const offerToTeam = offer ? offer.team : null;

            if (currentUserTeam === offerToTeam) {
              console.log(
                `OFFER TO TEAM: ${offerToTeam}\nCURRENT USER TEAM: ${currentUserTeam}`
              );
              if (this.alert.newOfferSale.offer) {
                this.newOfferSaleToAwait(offer.id).then(() => {
                  this.addOfferSaleToAwaitedList(offer);
                });
              } else {
                this.alert.newOfferSale.offer = offer;
              }
            }
          });
        };
        console.warn(User.api());
        const teamId = dataUser.team;
        const responseOffersAwaited = await this.$store.dispatch(
          'offer/getOfferAwaitedSell',
          teamId
        );
        const offerSaleCount = responseOffersAwaited.data.length;
        this.$store.commit(
          'mainLayout/SET_COUNT_AWAITED_OFFERS',
          offerSaleCount
        );
        // this.alert.newOfferSale.count = offerSaleCount;
        this.arrays.offersAwaited = responseOffersAwaited.data;
        console.error('DATA USER\n', dataUser);
        // this.$store.commit('team/SET_BALANCE_RUNNING');
        const dataTeam = await this.$store.dispatch('team/getDataTeam', teamId);
        // const responseAccount = await this.$store.dispatch(
        //   'account/getAccountById',
        //   dataTeam.account
        // );
        // const dataAccount =
        //   responseAccount.status == 200 ? responseAccount.data : {};
        this.sidebarUserInfo.role.value = roleUser;

        this.sidebarUserInfo.username.value = username;

        this.sidebarUserInfo.team.value = dataTeam.name;

        // this.$store.commit('team/SET_BALANCE', dataAccount.balance);
        // this.$store.commit('team/SET_BALANCE_RUNNING_COMPLETE');
        await this.$store.dispatch('team/updateTeamBalance', teamId);
        this.render.balance = false;
      }

      this.sidebar.links = sidebarLinks;
    } else {
      this.$router.push('/');
    }
  },

  methods: {
    async newOfferSaleToAwait(offerId) {
      console.log(offerId);
      await this.$store.dispatch('offer/offerSaleChangeStateAwait', offerId);
    },
    getDataOrError(response) {
      if (response.status == 200) {
        return response.data;
      } else {
        this.alert.error.message = response.message;
        this.alert.error.active = true;
      }
    },

    addOfferSaleToAwaitedList(offer) {
      console.warn('MAINLAYOUT: addOfferSaleToAwaitedList');
      this.arrays.offersAwaited.push(offer);
      let offersCount = this.offersAwaitedCount;
      // this.alert.newOfferSale.count += 1;
      offersCount += 1;
      this.$store.commit('mainLayout/SET_COUNT_AWAITED_OFFERS', offersCount);
    },
    updateOffersAwaitedCount(count) {
      console.warn('MAINLYAOUT: updateOffersAwaitedCount');
      this.alert.newOfferSale.count = count;
    },
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

    onClickTab(rowModel, data) {
      this.sidebar.className = 'sidebar-container';
      this.sidebar.isActive = !this.sidebar.isActive;
      this.setActiveTab(rowModel, data);
    },
    setActiveTab(rowModel, data) {
      console.log(rowModel);
      console.log(data);
      const routeName = rowModel.url;
      const title = rowModel.title;
      const activeTab = this.activeTab ? this.activeTab.toLowerCase() : '';
      console.log(activeTab);
      console.log(title);
      if (activeTab != title) {
        this.$store.commit('mainLayout/SET_CURRENT_TAB', title);

        this.$router.push({
          name: routeName,
          params: {data, currentRoute: rowModel},
        });
      }
    },
    onClickNewOfferCancel() {
      console.warn('MAINLAYOUT: onClickNewOfferCancel');
      this.alert.newOfferSale.active = false;
      this.alert.success.active = false;
      this.alert.error.active = false;
      this.alert.newOfferSale.offer = null;
      this.alert.newOfferPurchase.offer = null;
      this.alert.load.newOffer = false;
    },

    async updateTeamBalance(teamId) {
      console.warn('MAINLAYOUT: updateTeamBalance');
      this.render.balance = true;
      const responseTeamBalance = await this.$store.dispatch(
        'team/getBalance',
        teamId
      );
      const balance = this.getDataOrError(responseTeamBalance);
      console.log('MAINLAYOUT: team balance', balance);
      this.$store.commit('team/SET_BALANCE', balance);
      this.render.balance = false;
    },

    async onClickNewOfferApply() {
      console.warn('MAINLAYOUT: onClickNewOfferApply');
      this.alert.load.newOffer = true;
      const offerSalePlace = this.alert.newOfferSale.offer;
      console.log(offerSalePlace);
      let offerId = offerSalePlace.id;
      const teamId = offerSalePlace.team;
      const responseOfferSaleAcquire = await this.$store.dispatch(
        'offer/offerSaleAcquire',
        {offerId: offerId, teamId: teamId}
      );
      if (responseOfferSaleAcquire.status === 200) {
        console.log('Offer sell success');
        this.alert.load.newOffer = false;

        console.log(this.currentUserData);
        const teamId = this.currentUserData.team;
        // await this.updateTeamBalance(teamId);
        this.render.balance = true;
        await this.$store.dispatch('team/updateTeamBalance', teamId);
        this.render.balance = false;
        // const responseTeamBalance = await this.$store.dispatch(
        //   'team/getBalance',
        //   teamId
        // );
        // const balance = this.getDataOrError(responseTeamBalance);
        // console.log('MAINLAYOUT: team balance', balance);
        // this.$store.commit('team/SET_BALANCE', balance);
        // this.render.balance = false;
        this.alert.success.active = true;
      } else {
        this.onClickNewOfferCancel();
        this.alert.error.active = true;
        this.alert.error.message = responseOfferSaleAcquire.message;
      }
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
