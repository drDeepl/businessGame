<template>
  <div class="shop-container">
    <Load v-if="$store.getters['shopState/GET_STATE_CREATED']" />

    <v-tabs color="#6C63FF" v-else>
      <v-tab>Предложения</v-tab>

      <v-tab @click="onClickTabTransaction">Все транзакции</v-tab>
      <!-- INFO: Вкладка с предложениями о покупке продуктового набора -->

      <v-tab-item>
        <!-- <v-expansion-panels> -->
        <!-- <v-expansion-panel> -->
        <!-- <v-expansion-panel-header @click="onClickOffers">
              <div class="shop-offer-header">
                <arrow-icon class="offer-header-arrow" />
                <span class="offer-header-item">Предложения</span>
              </div>
            </v-expansion-panel-header> -->

        <!-- <v-expansion-panel-content> -->
        <v-progress-circular
          v-if="$store.getters['shopState/GET_OFFERS_UPDATE']"
          color="#ee5544"
          class="manufacturer-layout"
          indeterminate
          size="64"
        >
        </v-progress-circular>
        <div
          class="shop-offers offers-not-found"
          v-else-if="offers.length == 0"
        >
          <span>нет активных предложений</span>
        </div>
        <div v-else class="cards-container">
          <!-- INFO revealId есть ключ во vuex state для отображения -->
          <!-- INFO обратной стороны карточки -->

          <v-card
            class="card-main-layout ma-2 pa-2"
            v-for="offer in offers"
            :key="offer.id"
          >
            <!-- {{ getProductKit(offer.product_kit) }} -->
            <!-- <OfferCard v-if="!prepareOfferState" /> -->
            <OfferCard
              :traderId="offer.trader"
              :product="offer.productKit_data.product_data.name"
              :frontItem="offer"
              :frontModelItem="cards.cardOffer.frontCard.model"
              :backItem="offer.productKit_data"
              :backModelItem="cards.cardOffer.backCard.model"
              :showLabel="true"
              :btnBuyOffer="onClickBuyOffer"
            >
            </OfferCard>

            <DialogError
              :title="'не хватает денег для покупки товара'"
              :active="lowBalance"
            >
              <v-card-text class="offer-card-text">
                <small class="mb-1">Баланс вашей команды:</small>
                <span class="offer-card-text-main price">
                  {{ $store.getters['user/GET_USER_BALANCE'] }}
                </span>
              </v-card-text>
              <v-card-text class="offer-card-text">
                <small class="mb-1">Стоимость комплекта: </small>
                <span class="offer-card-text-main price">{{
                  offer.price
                }}</span>
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
        <!-- </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels> -->
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
// import Form from '@/UI/Form.vue';

import OfferCard from '@/UI/OfferCard.vue';
import Load from '@/UI/Load.vue';
import DialogError from '@/UI/DialogError.vue';

import SaleOffer from '@/models/model.offer.sale';
import AccountTransfer from '@/models/model.account.transfer';
import ModelTransaction from '@/models/model.transaction';
import AccountAcquire from '@/models/model.account.acquire';
import ModelProductKit from '@/models/model.productKit';

import Offer from '@/store/models/Offer';
import Account from '@/store/models/Account';
import Transaction from '@/store/models/Transaction';
import User from '@/store/models/User';
import Team from '@/store/models/Team';
import {mapGetters} from 'vuex';
import {prepareTypes} from '@/helpers/helper.form';

// TODO: Синхронизировать данные между сервером через web socket или SSE
// TODO: расшифровку для карточки
// TODO: показ кнопки купить в зависимости от роли

export default {
  data() {
    return {
      lowBalance: false,

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
        state: this.$store.getters['shopState/GET_OFFERS_UPDATE'],
      },
    };
  },

  computed: {
    ...mapGetters({
      offerStateRunning: 'shopState/GET_buyOffer_STATE_RUNNING',
      offerStateComplete: 'shopState/GET_buyOffer_STATE_COMPLETE',
      offerStateError: 'shopState/GET_buyOffer_STATE_ERROR',
      prepareOfferState: 'shopState/GET_prepareOffer_STATE',
    }),
    offers() {
      console.warn('SHOP:offers');
      this.$store.commit('shopState/SET_OFFERS_UPDATE');
      const offers = this.$store
        .$db()
        .model('offers')
        .query()
        .with('productKit_data.product_data')

        .get();
      console.warn(offers);

      this.$store.commit('shopState/SET_OFFERS_UPDATED');
      return offers;
    },
    transactions() {
      console.warn('SHOP: transactions');
      return this.$store.$db().model('transactions').query().all();
    },

    offersUpdated() {
      console.warn('SHOP: offersUpdated');
      return this.offers;
    },
    currentUser: function () {
      return this.$store.state.auth.user.username;
    },
    currentUserData: function () {
      let username = this.$store.state.auth.user.username;
      return this.$store
        .$db()
        .model('users')
        .query()
        .where('username', username)
        .first();
    },
  },
  async created() {
    this.$store.commit('shopState/SET_STATE_LOAD_mainLayout');
    this.$store.commit('shopState/SET_STATE_CREATED');

    await Offer.api().getListSaleOffers();
    await Team.api().getListTeams();
    this.$store.commit('shopState/SET_STATE_CREATED_COMPLETE');
    const user = this.$store.state.auth.user;
    console.error(user);
    console.warn('USERNAME');

    this.$store.commit('shopState/SET_STATE_COMPLETE_mainLayout');
  },

  methods: {
    getProductKitTitle(offer) {
      let productKitTitle = {};
      productKitTitle['product'] = offer.productKit_data.product_data.name;
      return productKitTitle;
    },
    async prepareOffer(offer) {
      console.error('PREPARE OFFER\n', offer);
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
      // // NOTE: функция находит account_id_to по trader
      // // NOTE: account_id_from находится по текующему пользователю
      console.warn('SHOP.VUE: onClickBuyOffer');
      console.error('offer\n', offer);
      this.$store.commit('shopState/SET_buyOffer_STATE', 'RUNNING');
      const currentUserData = (
        await User.api().getUserByUsername(this.currentUser)
      ).response.data;
      console.log('CURRENT USER\n', currentUserData);
      const teamData = this.$store
        .$db()
        .model('teams')
        .query()
        .where('id', currentUserData.team)
        .first();
      console.log('DATA OF TEAM\n', teamData);
      const accountData = (await Account.api().getAccount(teamData.account))
        .response.data;
      const balance = Number.parseInt(accountData.balance);
      const offerPrice = Number.parseInt(offer.price);
      if (balance < offerPrice) {
        console.error('BALANCE LOW PRICE OFFER');
        this.lowBalance = true;
        this.$store.commit('shopState/SET_buyOffer_STATE_COMPLETE', 'RUNNING');
      } else {
        console.warn('CREATED OFFER', AccountTransfer, prepareTypes);
        const accountAcquire = new AccountAcquire().data;
        accountAcquire.offer_id = Number.parseInt(offer.id);
        console.warn(accountAcquire);
        console.error('offer\n', offer);
        try {
          const responseAccountAcquire = await Offer.api().offerSaleAcquire(
            Number.parseInt(offer.id)
          );
          console.error(responseAccountAcquire.response.data);
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

    onClickOffers() {
      // FIX: костыль подобия long polling для
      // FIX: динамического обновления предложений
      console.warn('SHOP: onClickOffers');
      const longPoll = this.$store.getters['shopState/GET_STATE_LONG_POLL'];
      console.warn(longPoll);
      if (longPoll) {
        console.error('LONG POLL WORK');
      } else {
        this.$store.commit('shopState/SET_LONG_POLL');
        console.error('LONG POLL RUNNING');
        setInterval(
          () =>
            Offer.api()
              .getListSaleOffers()
              .then((result) => console.log(result.response.data)),
          10000
        );
      }
    },
    onClickOkLowBalance() {
      console.warn('SHOP.VUE: onClickOkLowBalances');

      this.lowBalance = false;
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
