<template>
  <div class="shop-container">
    <Load v-if="$store.getters['shopState/GET_STATE_CREATED']" />

    <v-tabs color="#6C63FF" v-else>
      <v-tab>Предложения</v-tab>

      <v-tab @click="onClickTabTransaction">Все транзакции</v-tab>
      <!-- INFO: Вкладка с предложениями о покупке продуктового набора -->
      <v-tab-item>
        <v-switch
          dense
          color="green"
          class="ml-2 pl-2"
          v-model="getOfferUpdate"
          label="получать новые предложения"
          @click="onClickUpdateOffers"
        ></v-switch>

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
          v-else-if="arrays.offers.length == 0"
        >
          <span>нет активных предложений</span>
        </div>
        <div v-else class="cards-container">
          <v-card
            class="card-main-layout card-sheet ma-2 pa-2"
            v-for="offer in offers"
            :key="offer.id"
          >
            <!-- <div>{{ getProductKit(offer.product_kit) }}</div> -->

            <OfferCard
              :traderId="offer.trader"
              :product="getProductKitTitle(offer)"
              :frontItem="offer"
              :frontModelItem="cards.cardOffer.frontCard.model"
              :backItem="getProductKit(offer.product_kit)"
              :backModelItem="cards.cardOffer.backCard.model"
              :showLabel="true"
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
            <DialogError
              v-if="offerStateError"
              :title="'произошла ошибка при покупке комплекта'"
              :active="offerStateError"
            >
              <v-btn text color="red" @click="onClickCloseOfferError"
                >закрыть</v-btn
              >
            </DialogError>
          </v-card>
        </div>
      </v-tab-item>
      <!-- INFO: Вкладка с транзакциями -->
      <v-tab-item>
        <Load />
        <div class="transaction-container">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th
                    v-for="head in cards.cardTransaction.model.props"
                    :key="head"
                  >
                    {{ head }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="transaction in transactions" :key="transaction.id">
                  <td
                    v-for="item in Object.keys(transaction).filter(
                      (item) => !/^\$/.test(item)
                    )"
                    :key="item"
                  >
                    <span v-if="transaction[item] != null">
                      <span v-if="/account/.test(item)">
                        {{ getAccount(transaction[item]) }}
                      </span>
                      <span :class="'transaction-table-row ' + item" v-else>
                        {{ transaction[item] }}
                      </span>
                    </span>
                    <span v-else>данные отсутствуют</span>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-tab-item>
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

import OfferSale from '@/store/models/OfferSale';
import Transaction from '@/store/models/Transaction';
import Team from '@/store/models/Team';

import {mapGetters} from 'vuex';

// TODO: Синхронизировать данные между сервером через web socket или SSE
// TODO: расшифровку для карточки
// TODO: показ кнопки купить в зависимости от роли

export default {
  data: function () {
    return {
      getOfferUpdate: false,
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
        transactions: [],
        users: [],
        teams: [],
        offers: [],
      },
    };
  },

  computed: {
    ...mapGetters({
      offerStateRunning: 'shopState/GET_buyOffer_STATE_RUNNING',
      offerStateComplete: 'shopState/GET_buyOffer_STATE_COMPLETE',
      offerStateError: 'shopState/GET_buyOffer_STATE_ERROR',
      prepareOfferState: 'shopState/GET_prepareOffer_STATE',
      longPollId: 'shopState/GET_LONG_POLL_ID',
      balanceTeam: 'team/GET_BALANCE_VALUE',
      dataCurrentUser: 'user/GET_DATA_CURRENT_USER',
      offersListUpdate: 'offer/GET_OFFERS_LIST_UPDATE',
      currentUserData: 'user/GET_DATA_CURRENT_USER',
    }),
    offers: {
      get() {
        return this.arrays.offers;
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
  async created() {
    this.$store.commit('shopState/SET_STATE_LOAD_mainLayout');
    this.$store.commit('shopState/SET_STATE_CREATED');
    const roleCurrentUser = await this.$store.dispatch(
      'user/getUserDataByUsername',
      this.currentUser
    ).role;
    this.$store.commit('offer/SET_OFFERS_LIST_UPDATE');

    if (roleCurrentUser == 'cutomer') {
      const listOffersPurchase = await this.$store.dispatch(
        'offer/getOffersPurchase'
      );
      this.arrays.offers = listOffersPurchase;
    } else {
      const listOffersSale = await this.$store.dispatch('offer/getOffersSale');
      this.arrays.offers = listOffersSale;
      console.log(listOffersSale);
    }

    await Team.api().getListTeams();
    this.$store.commit('shopState/SET_STATE_CREATED_COMPLETE');
    const user = this.$store.state.auth.user;
    console.error(user);
    console.warn('USERNAME');
  },
  mounted() {
    this.$store.commit('shopState/SET_STATE_COMPLETE_mainLayout');
  },

  methods: {
    getProductKit(productKitId) {
      return this.$store.$db().model('productKits').find(productKitId);
    },
    getProductKitTitle(offer) {
      const productKit = this.getProductKit(offer.product_kit);
      const product = this.$store
        .$db()
        .model('products')
        .find(productKit.product);

      return product.name;
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
          this.$store.commit('team/SET_BALANCE_RUNNIG');
          const teamId = this.dataCurrentUser.team;
          const dataTeam = this.$store
            .$db()
            .model('teams')
            .query()
            .where('id', teamId)
            .first();
          const responseAccountAcquire = await OfferSale.api().offerSaleAcquire(
            offerId
          );
          const dataAccount = await this.$store.dispatch(
            'account/getAccountById',
            dataTeam.account
          );
          this.$store.commit('team/SET_BALANCE', dataAccount.balance);
          console.error(responseAccountAcquire.response.data);
          this.$store.commit('team/SET_BALANCE_RUNNING_COMPLETE');
          await this.$store.dispatch('offer/getOffersSale');
          this.$store.commit('shopState/SET_buyOffer_STATE', 'COMPLETE');
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

    onClickUpdateOffers() {
      if (this.getOfferUpdate) {
        console.error('LONG POLL');
        const longPollId = setInterval(
          () =>
            OfferSale.api()
              .getListOffersSale()
              .then((result) => (this.arrays.offers = result.response.data)),
          10000
        );
        this.$store.commit('shopState/SET_LONG_POLL_ID', longPollId);
      } else {
        console.warn('CLEAR INTERVAL');
        console.warn(this.longPollId);
        clearInterval(this.longPollId);
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
