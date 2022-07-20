<template>
  <div class="shop-container">
    <!-- <Form> </Form> -->
    <v-tabs>
      <v-tab>Предложения</v-tab>
      <v-tab @click="onClickTabTransaction">Все транзакции</v-tab>
      <v-tab-item>
        <div v-if="offers.length > 0" class="cards-container">
          <ProductCard
            v-for="offer in offers"
            :key="offer.id"
            :item="changeTrader(offer)"
            :modelItem="cards.cardOffer.model"
            :showLabel="true"
          >
            <div
              class="product-card-text"
              v-if="currentUserData.role.toLowerCase() == 'player'"
            >
              <v-btn
                class="ma-1"
                outlined
                rounded
                color="#ee5544"
                @click="onClickBuyProductKit(offer)"
              >
                купить</v-btn
              >
            </div>
          </ProductCard>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="transaction-container" v-if="transactions.length > 0">
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
import ProductCard from '@/UI/ProductCard.vue';
import Offer from '@/store/models/Offer';
import SaleOffer from '@/models/model.offer.sale';
import AccountTransfer from '@/models/model.account.transfer';
import ModelTransaction from '@/models/model.transaction';
import Account from '@/store/models/Account';
import Transaction from '@/store/models/Transaction';
import User from '@/store/models/User';
import Team from '@/store/models/Team';

import {prepareTypes} from '@/helpers/helper.form';
export default {
  async created() {
    await Offer.api().getListSaleOffers();
    const user = this.$store.state.auth.user;
    console.error(user);
    console.warn('USERNAME');
    const users = await User.api().getListUsers();
    this.arrays.users = users.response.data;
    await Team.api().getListTeams();
  },
  data() {
    return {
      title: '',
      cards: {
        cardOffer: {
          model: new SaleOffer(),
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
  computed: {
    offers() {
      return this.$store.$db().model('offers').all();
    },
    changeTrader() {
      console.warn('SHOP: changeTrader');
      return (offer) => {
        console.warn(offer);
        const trader = this.$store
          .$db()
          .model('users')
          .query()
          .where('id', offer.trader)
          .first();

        if (trader == undefined || trader == null) {
          return offer;
        } else {
          offer.trader = trader.username;
          return offer;
        }
      };
    },
    getUsernameByAccountId() {
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
    changeProductKit() {
      return (offer) => {
        console.warn('SHOP: WATCH: changeProductKit');
        console.warn(offer.product_kit);
        const productKit = this.$store
          .$db()
          .model('productKits')
          .query()
          .where('id', offer.product_kit)
          .first();
        const productName = this.$store
          .$db()
          .model('products')
          .query()
          .where('id', productKit.product)
          .first();
        offer.product_kit = productName;
        return offer;
      };
    },
    currentUser() {
      return this.$store.state.auth.user.username;
    },
    currentUserData() {
      let username = this.$store.state.auth.user.username;
      return this.$store
        .$db()
        .model('users')
        .query()
        .where('username', username)
        .first();
    },
    formatTimeStamp() {
      return (timestamp) => {
        const datetime = timestamp.split('T');
        const date = datetime[0];
        const time = datetime[1].split('.')[0];
        return time + ' ' + date;
      };
    },
    transactions() {
      console.warn('SHOP: transactions');
      return this.$store.$db().model('transactions').query().all();
    },
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
      console.warn('SHOP.VUE: onClickBuyProductKit');
      console.error('offer\n', offer);
      console.warn('currentUser', this.currentUser);
      const offers = this.$store.$db().model('offers').query().all();
      console.error(offers);
      const accountTransfer = new AccountTransfer();
      const trader = this.$store
        .$db()
        .model('users')
        .query()
        .where('username', offer.trader)
        .first();
      const account_id_from = trader.account;
      const account_id_to = this.currentUserData.account;
      accountTransfer.data.account_id_from = account_id_from;
      accountTransfer.data.account_id_to = account_id_to;
      accountTransfer.data.amount = offer.price;
      const createdOffer = prepareTypes(
        accountTransfer.data,
        accountTransfer.types
      );
      await Account.api().accountTransfer(createdOffer);
    },
  },
  components: {ProductCard},
};
</script>
