<template>
  <div class="shop-container">
    <Load v-if="$store.getters['shopState/GET_STATE_CREATED']" />

    <v-tabs
      class="panel-tabs"
      center-active
      centered
      fixed-tabs
      color="#6C63FF"
      v-else
    >
      <div class="panel-tabs container">
        <v-tab class="panel-tabs tabs">
          <span class="panel-tabs text">Предложения поставщика</span>
        </v-tab>

        <v-tab class="panel-tabs tabs">
          <span class="panel-tabs text">Предложения клиента</span>
        </v-tab>
      </div>

      <!-- INFO: Вкладка с предложениями о покупке продуктового набора у поставщика -->
      <v-tab-item>
        <v-btn
          v-if="currentUserData.role == 'PLAYER'"
          small
          rounded
          outlined
          :elevation="9"
          color="green accent-3"
          class="mt-2 ml-2"
          :load="offersListUpdate"
          @click="onClickUpdateOffers"
        >
          <v-spacer><restore-icon /></v-spacer>
        </v-btn>

        <v-progress-circular
          v-if="offersListUpdate"
          color="#ee5544"
          class="manufacturer-layout"
          indeterminate
          size="64"
        >
        </v-progress-circular>
        <div
          class="shop-offers offers-not-found"
          v-else-if="arrays.offers.sale.length == 0"
        >
          <span>нет активных предложений</span>
        </div>
        <div v-else class="cards-container">
          <v-card
            class="card-main-layout card-sheet ma-2 pa-2"
            v-for="offer in offersSale"
            :key="offer.id"
          >
            <OfferCard
              title="Комплект для продукта:"
              :traderId="offer.trader"
              :product="offer.product_kit"
              :frontItem="offer"
              :frontModelItem="cards.cardOffer.frontCard.model"
              :backModelItem="cards.cardOffer.backCard.model"
              :backCardProductKit="offer.product_kit"
              :showLabel="true"
              :isOfferProductKit="true"
            >
              <v-btn
                v-if="currentUserData.role == 'PLAYER'"
                class="buy ma-1"
                outlined
                rounded
                color="#ee5544"
                @click="onClickBuyOffer(offer)"
              >
                <span>купить</span>
              </v-btn>
            </OfferCard>

            <DialogError
              :title="'не хватает денег для покупки товара'"
              :active="lowBalance.isLow"
            >
              <v-card-text class="offer-card-text">
                <small class="mb-1">Баланс вашей команды:</small>
                <span class="offer-card-text-main price">
                  {{ balanceTeam }}
                </span>
              </v-card-text>
              <v-card-text class="offer-card-text">
                <small class="mb-1">Стоимость комплекта: </small>
                <span class="offer-card-text-main price">
                  {{ lowBalance.offerPrice }}
                </span>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="red" @click="onClickOkLowBalance">
                  закрыть
                </v-btn>
              </v-card-actions>
            </DialogError>
          </v-card>
        </div>
      </v-tab-item>
      <!-- INFO: Вкладка с предложениями клиента о покупке -->
      <v-tab-item>
        <v-btn
          v-if="currentUserData.role == 'PLAYER'"
          small
          rounded
          outlined
          :elevation="9"
          color="green accent-3"
          class="mt-2 ml-2"
          :load="offersListUpdate"
          @click="onClickUpdatePurchaseOffers"
        >
          <v-spacer><restore-icon /></v-spacer>
        </v-btn>

        <v-progress-circular
          v-if="offersListUpdate"
          color="#ee5544"
          class="manufacturer-layout"
          indeterminate
          size="64"
        >
        </v-progress-circular>
        <div
          class="shop-offers offers-not-found"
          v-else-if="arrays.offers.purchase.length == 0"
        >
          <span>нет активных предложений</span>
        </div>
        <div v-else class="cards-container">
          <v-card
            class="card-main-layout card-sheet ma-2 pa-2"
            v-for="offer in offersPurchase"
            :key="offer.id"
          >
            <OfferCard
              title="Продукт"
              :badgeValue="offer.count + ''"
              :traderId="offer.trader"
              :product="offer.product"
              :frontItem="offer"
              :frontModelItem="cards.cardOffer.frontCard.model"
              :backModelItem="cards.cardOffer.backCard.model"
              :backCardProductKit="offer.product_kit"
              :showLabel="true"
            >
              <v-btn
                v-if="currentUserData.role == 'PLAYER'"
                class="buy ma-1"
                outlined
                rounded
                color="#ee5544"
                @click="onClickSaleOffer(offer)"
              >
                <span>Продать</span>
              </v-btn>
            </OfferCard>
          </v-card>
        </div>
      </v-tab-item>
      <DialogError
        v-if="offerStateError"
        :title="errors.messages.errorTitle"
        :active="offerStateError"
      >
        <v-card-text v-for="message in errors.offerPurchase" :key="message">
          <span>{{ message }}</span>
        </v-card-text>

        <v-btn text color="red" @click="onClickCloseOfferError">закрыть</v-btn>
      </DialogError>
    </v-tabs>
  </div>
</template>

<script>
import OfferCard from '@/UI/OfferCard.vue';
import Load from '@/UI/Load.vue';
import DialogError from '@/UI/DialogError.vue';

import SaleOffer from '@/models/model.offer.sale';
import ModelTransaction from '@/models/model.transaction';
import ModelProductKit from '@/models/model.productKit';

import Transaction from '@/store/models/Transaction';
import Team from '@/store/models/Team';

import Message from '@/helpers/messages';
import {mapGetters} from 'vuex';

export default {
  data: function () {
    return {
      // getOfferUpdate: false,
      lowBalance: {
        isLow: false,
        offerPrice: 0,
      },

      title: '',
      revealCards: {},
      cards: {
        cardOffer: {
          frontCard: {model: new SaleOffer()},
          backCard: {model: new ModelProductKit()},
        },
        cardTransaction: {
          model: new ModelTransaction(),
        },
      },
      table: {
        transaction: {
          headers: [],
        },
      },
      arrays: {
        users: [],
        teams: [],
        offers: {sale: [], purchase: []},
      },
      errors: {
        messages: new Message(),
        offerPurchase: [],
      },
    };
  },

  computed: {
    ...mapGetters({
      offerStateRunning: 'shopState/GET_buyOffer_STATE_RUNNING',
      offerStateError: 'shopState/GET_buyOffer_STATE_ERROR',
      prepareOfferState: 'shopState/GET_prepareOffer_STATE',
      longPollId: 'shopState/GET_LONG_POLL_ID',
      isOffersUpdateComplete: 'shopState/GET_OFFERS_UPDATE_COMPLETE',
      balanceTeam: 'team/GET_BALANCE_VALUE',
      dataCurrentUser: 'user/GET_DATA_CURRENT_USER',
      offersListUpdate: 'offer/GET_OFFERS_LIST_UPDATE',
      currentUserData: 'user/GET_DATA_CURRENT_USER',
      isOfferAcquireError: 'offer/GET_OFFER_ACQUIRE_ERROR',
    }),
    offersSale: {
      get() {
        return this.arrays.offers.sale;
      },
    },
    offersPurchase: {
      get() {
        return this.arrays.offers.purchase;
      },
    },

    transactions() {
      console.warn('SHOP: transactions');
      return this.$store.$db().model('transactions').query().all();
    },
    currentUser: function () {
      return this.$store.state.auth.user.username;
    },
  },
  watch: {
    isOffersUpdateComplete(offersUpdateComplete) {
      console.error('WATCH: isOffersUpdateComplete ', offersUpdateComplete);
      if (offersUpdateComplete) {
        let listOffersSale = this.$store
          .$db()
          .model('offersSale')
          .all()
          .filter((key) => !!key.trader);
        console.warn(listOffersSale);
        this.arrays.offers.sale = listOffersSale;
        this.$store.commit('shopState/SET_OFFERS_UPDATED');
      }
    },
  },
  async created() {
    this.$store.commit('shopState/SET_STATE_LOAD_mainLayout');
    this.$store.commit('shopState/SET_STATE_CREATED');
    this.$store.commit('offer/SET_OFFERS_LIST_UPDATE');
    const listOffersPurchase = await this.$store.dispatch(
      'offer/getOffersPurchase'
    );
    console.log(listOffersPurchase);
    this.arrays.offers.purchase = listOffersPurchase;
    const listOffersSale = await this.$store.dispatch('offer/getOffersSale');
    this.arrays.offers.sale = listOffersSale;
    console.log(listOffersSale);
    await Team.api().getListTeams();
    // FIX ========================================================
    this.$store.commit('shopState/SET_STATE_CREATED_COMPLETE');
    this.connection = new WebSocket('ws://localhost:8000/ws/');
    this.connection.onmessage = () => {
      this.$store.dispatch('offers/getOffersSale').then((response) => {
        // this.myJson_s = response.data;
        console.log('OFFERS: SALE ', response.data);
      }),
        this.$store.dispatch('offers/getOffersPurchase').then((response) => {
          // this.myJson_p = response.data;
          console.log('OFFERS: PURCHASE ', response.data);
        });
    };
    // FIX ========================================================
  },
  mounted() {
    this.$store.commit('shopState/SET_STATE_COMPLETE_mainLayout');
  },

  methods: {
    getProductKit(productKitId) {
      if (productKitId) {
        console.error('SHOP.VUE: getProductKit');
        console.warn(productKitId);
        return this.$store.$db().model('productKits').find(productKitId);
      }
    },
    getProductKitTitle(offer) {
      if (offer) {
        console.error('SHOP.VUE: getProductKitTitle');
        console.warn(offer);
        const productKit = this.getProductKit(offer.product_kit);
        console.warn(productKit);

        const product = this.$store
          .$db()
          .model('products')
          .find(productKit.product);
        if (product) {
          return product.name;
        }
      }
    },

    getAccount(accountId) {
      console.warn('SHOP: getAccount');
      const team = this.$store
        .$db()
        .model('teams')
        .query()
        .where('account', accountId)
        .first();
      console.warn(team);
      return team ? team.name : 'команды с таким счетом не существует';
    },
    async updateTeamBalance() {
      this.$store.commit('team/SET_BALANCE_RUNNING');
      const teamId = this.dataCurrentUser.team;
      const dataTeam = this.$store
        .$db()
        .model('teams')
        .query()
        .where('id', teamId)
        .first();

      const dataAccount = await this.$store.dispatch(
        'account/getAccountById',
        dataTeam.account
      );
      console.warn(dataTeam);

      this.$store.commit('team/SET_BALANCE', dataAccount.balance);
      this.$store.commit('offer/SET_OFFER_ACQUIRE');
      this.$store.commit('team/SET_BALANCE_RUNNING_COMPLETE');
      this.$store.commit('shopState/SET_OFFERS_UPDATE_RUNNING');
      this.$store.commit('shopState/SET_buyOffer_STATE_COMPLETE', 'RUNNING');
    },
    async onClickTabTransaction() {
      console.warn('SHOP.VUE: onClickTabTransaction');
      const response = await Transaction.api().getListTransactions();
      const transactionList = response.response.data;
      console.error(transactionList);
      this.arrays.transactions = transactionList;
    },
    async onClickBuyOffer(offer) {
      console.warn('SHOP.VUE: onClickBuyOffer');

      this.$store.commit('shopState/SET_buyOffer_STATE', 'RUNNING');
      const balance = Number.parseInt(this.balanceTeam);
      const offerPrice = Number.parseInt(offer.price);
      if (balance < offerPrice) {
        console.error('BALANCE LOW PRICE OFFER');
        this.lowBalance.isLow = true;
        this.lowBalance.offerPrice = offer.price;
        this.$store.commit('shopState/SET_buyOffer_STATE_COMPLETE', 'RUNNING');
      } else {
        try {
          const offerId = offer.id;
          const response = await this.$store.dispatch(
            'offer/offerSaleAcquire',
            offerId
          );
          this.$store.$db().model('offersSale').delete(offer.id);
          console.error('OFFER ACQUIRE RESPONSE\n', response);
          await this.updateTeamBalance();
          // this.$store.commit('team/SET_BALANCE_RUNNING');
          // const teamId = this.dataCurrentUser.team;
          // const dataTeam = this.$store
          //   .$db()
          //   .model('teams')
          //   .query()
          //   .where('id', teamId)
          //   .first();

          // const dataAccount = await this.$store.dispatch(
          //   'account/getAccountById',
          //   dataTeam.account
          // );
          // console.warn(dataTeam);

          // this.$store.commit('team/SET_BALANCE', dataAccount.balance);
          // this.$store.commit('offer/SET_OFFER_ACQUIRE');
          // console.warn(offerId);

          // this.$store.commit('team/SET_BALANCE_RUNNING_COMPLETE');
          // this.$store.commit('shopState/SET_OFFERS_UPDATE_RUNNING');
          // this.$store.commit(
          //   'shopState/SET_buyOffer_STATE_COMPLETE',
          //   'RUNNING'
          // );
        } catch (e) {
          console.warn(e);
          this.$store.commit(
            'shopState/SET_buyOffer_STATE_COMPLETE',
            'RUNNING'
          );
          this.$store.commit('shopState/SET_buyOffer_STATE', 'ERROR');
        }
      }
    },

    async onClickUpdateOffers() {
      this.$store.commit('offer/SET_OFFERS_LIST_UPDATE');
      const listOffersSale = await this.$store.dispatch('offer/getOffersSale');
      this.arrays.offers.sale = listOffersSale;
    },
    async onClickUpdatePurchaseOffers() {
      const listOffersSale = await this.$store.dispatch(
        'offer/getOffersPurchase'
      );
      this.arrays.offers.purchase = listOffersSale.reverse();
    },
    async onClickSaleOffer(offer) {
      this.$store.commit('shopState/SET_buyOffer_STATE', 'RUNNING');
      try {
        const offerId = offer.id;
        const response = await this.$store.dispatch(
          'offer/offerPurchaseAcquire',
          offerId
        );
        this.$store.commit('shopState/SET_buyOffer_STATE_COMPLETE', 'RUNNING');
        this.$store.$db().model('offersPurchase').delete(offer.id);
        console.error('OFFER ACQUIRE RESPONSE\n', response);
        await this.updateTeamBalance();
        await this.onClickUpdatePurchaseOffers();
      } catch (e) {
        console.warn(Object.keys(e));
        if (e.response.data.includes('TeamHaveNot')) {
          console.warn(e.response.data);
          this.errors.offerPurchase.push(
            this.errors.messages.teamHaveNotProduct
          );
        }

        this.$store.commit('shopState/SET_buyOffer_STATE_COMPLETE', 'RUNNING');
        this.$store.commit('shopState/SET_buyOffer_STATE', 'ERROR');
      }
    },
    onClickOkLowBalance() {
      console.warn('SHOP.VUE: onClickOkLowBalances');

      this.lowBalance.isLow = false;
      this.$store.commit('shopState/SET_buyOffer_STATE_COMPLETE', 'RUNNING');
    },
    onClickCloseOfferError() {
      console.warn('SHOP.VUE" onClickCloseOfferError');
      this.$store.commit('shopState/SET_buyOffer_STATE_COMPLETE', 'ERROR');
    },
  },

  components: {OfferCard, Load, DialogError},
};
</script>
