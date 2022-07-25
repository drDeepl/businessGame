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
// import User from '@/store/models/User';
import Team from '@/store/models/Team';

import {prepareTypes} from '@/helpers/helper.form';
export default {
  data() {
    return {
      loading: false,
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
      // NOTE: функция находит account_from по trader
      // NOTE: account_id_to находится по текующему пользователю
      console.warn('SHOP.VUE: onClickBuyProductKit');
      console.error('offer\n', offer);
      const currentUserData = (
        await User.api().getUserByUsername(this.currentUser)
      ).response.data;

      // FIX Чтобы получить баланс необходимо иметь номер счёта
      // FIX пользователь создаётся без номера счёта
      const balance = (await Account.api().getAccount(currentUserData.account))
        .response.data;
      // FIX =======================================

      const offerPrice = Number.parseInt(offer.price);
      console.error(balance, '\noffer price ' + offerPrice);
      console.warn('CURRENT_USER_DATA\n', currentUserData);
      const account_to = this.currentUserData.account;
      const account_from = offer.trader;
      const amount = offerPrice;
      const accountTransfer = new AccountTransfer();
      console.error(prepareTypes, accountTransfer);
      accountTransfer.data['account_id_from'] = account_from;
      accountTransfer.data['account_id_to'] = account_to;
      accountTransfer.data.amount = amount;
      const createdOffer = prepareTypes(
        accountTransfer.data,
        accountTransfer.types
      );
      console.log(Account);
      console.warn('CREATED OFFER', createdOffer);
      // const transfer = await Account.api().accountTransfer(createdOffer);
      // console.warn(transfer);
    },
  },
  async created() {
    this.loading = true;
    await Offer.api().getListSaleOffers();
    await Team.api().getListTeams();
    const user = this.$store.state.auth.user;
    console.error(user);
    console.warn('USERNAME');
  },
  components: {ProductCard},
};
</script>
