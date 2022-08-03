<template>
  <div class="shop-container">
    <!-- <Form> </Form> -->
    <Load v-if="$store.getters['shopState/GET_STATE_mainLayout']" />
    <v-tabs v-else>
      <v-tab>Предложения</v-tab>

      <v-tab @click="onClickTabTransaction">Все транзакции</v-tab>
      <!-- INFO: Вкладка с предложениями о покупке продуктового набора -->
      <v-tab-item>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header @click="onClickOffers">
              <div class="shop-offer-header">
                <arrow-icon class="offer-header-arrow" />
                <span class="offer-header-item">Предложения</span>
              </div>
            </v-expansion-panel-header>

            <v-expansion-panel-content>
              <v-progress-circular
                v-if="offers.length <= 0"
                color="#ee5544"
                class="manufacturer-layout"
                indeterminate
                size="64"
              ></v-progress-circular>

              <div v-else class="cards-container">
                <!-- INFO revealId есть ключ во vuex state для отображения -->
                <!-- INFO обратной стороны карточки -->

                <OfferCard
                  v-for="offer in offers"
                  :key="offer.id"
                  :title="{for_product: true}"
                  :item="offer"
                  :itemReveal="getProductKit(offer.product_kit)"
                  :modelItem="cards.cardOffer.model"
                  :modelReveal="cards.cardOffer.reveal.model"
                  :showLabel="true"
                >
                  <v-btn
                    v-if="currentUserData.role.toLowerCase() == 'player'"
                    class="ma-1"
                    outlined
                    rounded
                    color="#ee5544"
                    @click="onClickBuyProductKit(offer)"
                  >
                    <span>купить</span>
                  </v-btn>
                </OfferCard>
                <v-bottom-sheet v-model="lowBalance">
                  <v-sheet class="text-center" height="15em">
                    <v-btn
                      class="mt-6"
                      text
                      color="red"
                      @click="onClickOkLowBalance"
                    >
                      закрыть
                    </v-btn>
                    <div class="py-3">
                      <v-card-text
                        >Упс.. не хватает денег на балансе для покупки
                        товара</v-card-text
                      >
                      <v-card-text v-for="offer in offers" :key="offer['$id']">
                        {{ offer }}
                      </v-card-text>
                    </div>
                  </v-sheet>
                </v-bottom-sheet>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-tab-item>
      <!-- INFO: Вкладка с транзакциями -->
      <v-tab-item>
        <!-- <Load /> -->
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

import SaleOffer from '@/models/model.offer.sale';
import AccountTransfer from '@/models/model.account.transfer';
import ModelTransaction from '@/models/model.transaction';
import AccountAcquire from '@/models/model.account.acquire';
import ModelProductKit from '@/models/model.productKit';

import Offer from '@/store/models/Offer';
import Account from '@/store/models/Account';
import Transaction from '@/store/models/Transaction';
import User from '@/store/models/User';
// import User from '@/store/models/User';
import Team from '@/store/models/Team';
import {prepareTypes} from '@/helpers/helper.form';

// TODO: [26.07.2022] Синхронизировать данные между компонентами через web socket или SSE
// TODO: [02.08.2022] проверку на уникальность продукта
// TODO: [03.08.2022] расшифровку для карточки

export default {
  data() {
    return {
      lowBalance: false,

      title: '',
      revealCards: {},
      cards: {
        cardOffer: {
          model: new SaleOffer(),
          reveal: {
            model: new ModelProductKit(),
          },
          currentCard: null,
          active: [],
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
      },
    };
  },
  async created() {
    this.$store.commit('shopState/SET_STATE_LOAD_mainLayout');
    await Offer.api().getListSaleOffers();
    this.$store.dispatch('productKit/getProductKits');
    await Team.api().getListTeams();
    const user = this.$store.state.auth.user;
    console.error(user);
    console.warn('USERNAME');
    this.$store.commit('shopState/SET_STATE_COMPLETE_mainLayout');
  },

  computed: {
    offers: function () {
      const offers = Offer.query().orderBy('id', 'desc').get();
      return offers;
    },
    // changeTrader: function () {
    //   console.warn('SHOP: changeTrader');
    //   return (offer) => {
    //     console.warn(offer);
    //     const trader = this.$store
    //       .$db()
    //       .model('users')
    //       .query()
    //       .where('id', offer.trader)
    //       .first();

    //     if (trader == undefined || trader == null) {
    //       return offer;
    //     } else {
    //       offer.trader = trader.username;
    //       return offer;
    //     }
    //   };
    // },
    getUsernameByAccountId: function () {
      console.warn('SHOP: getUsernameByAccountId');
      return (id) => {
        const user = this.$store
          .$db()
          .model('users')
          .query()
          .where('account', id)
          .first();
        console.warn('user\n', user);
        return user
          ? user.username
          : 'пользователя с id ' + id + 'не существует';
      };
    },
    // changeProductKit: function () {
    //   return (offer) => {
    //     console.warn('SHOP: COMPUTED: changeProductKit');
    //     console.warn(offer);

    //     const product_id = this.$store
    //       .$db()
    //       .model('productKits')
    //       .query()
    //       .where('id', offer.product_kit)
    //       .first().product;
    //     const product = this.$store
    //       .$db()
    //       .model('products')
    //       .query()
    //       .where('id', product_id)
    //       .first();
    //     offer.for_product = product.name;
    //     return offer;
    //   };
    // },
    getProductKit: function () {
      return (productKitId) => {
        const productKit =
          this.$store.getters['productKit/GET_PRODUCT_KIT'](productKitId);

        return productKit || productKitId;
      };
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

    transactions() {
      console.warn('SHOP: transactions');
      return this.$store.$db().model('transactions').query().all();
    },
    learnMoreActive: function () {
      // return Object.prototype.hasOwnProperty.call(activeCards);
      return this.revealCards;
      // return this.cards.cardOffer.active.hasOwnProperty(offer_id);
    },
  },
  watch: {
    // TODO: навесить наблюдателя, который
    // TODO: будет изменять состояние вкладки "Предложения"
  },
  methods: {
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
    async onClickBuyProductKit(offer) {
      // NOTE: функция находит account_id_to по trader
      // NOTE: account_id_from находится по текующему пользователю
      console.warn('SHOP.VUE: onClickBuyProductKit');
      console.error('offer\n', offer);
      const currentUserData = (
        await User.api().getUserByUsername(this.currentUser)
      ).response.data;

      const accountData = (
        await Account.api().getAccount(currentUserData.account)
      ).response.data;
      const balance = Number.parseInt(accountData.balance);
      const offerPrice = Number.parseInt(offer.price);
      if (balance < offerPrice) {
        console.error('BALANCE LOW PRICE OFFER');
        this.lowBalance = true;
      } else {
        console.warn('CREATED OFFER', AccountTransfer, prepareTypes);
        const accountAcquire = new AccountAcquire().data;
        accountAcquire.offer_id = Number.parseInt(offer.id);
        console.warn(accountAcquire);
        console.error('offer\n', offer);
        const responseAccountAcquire = await Offer.api().offerSaleAcquire(
          Number.parseInt(offer.id)
        );
        console.error(responseAccountAcquire.response.data);
      }
    },
    onClickOpenLearnMore(offer_id) {
      console.warn('SHOP.VUE: onClickLearnMore');
      console.error('productKitId\n', offer_id);

      this.$store.commit('offer/SET_OPEN_learnMore', offer_id);

      // const pk =
      // this.$store.getters['productKit/GET_PRODUCT_KIT'](productKitId);
      // console.error(pk);
    },

    onClickCloseLearnMore(offer_id) {
      console.warn('SHOP.VUE: onCLickCloseLearnMore');
      console.warn(offer_id);
      this.revealCards[offer_id] = false;
    },
    onClickOffers() {
      // FIX: костыль подобия long polling для
      // FIX: динамического обновления предложений
      console.warn('SHOP: onClickOffers');
      // let offers = setInterval(
      //   () =>
      //     Offer.api()
      //       .getListSaleOffers()
      //       .then((result) => console.log(result.response.data)),
      //   100000
      // );
      // console.error(offers);
    },
    onClickOkLowBalance() {
      console.warn('SHOP.VUE: onClickOkLowBalances');
      // NOTE: Данная функция закрывает всплывающее сообщение
      this.lowBalance = false;
    },
  },
  components: {OfferCard, Load},
};
</script>
