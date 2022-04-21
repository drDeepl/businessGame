<template>
  <div class="wrapper">
    <div class="card" v-for="card in cards" :key="card.body">
      <CollapsedCard :title="card.title" :id="card.body">
        <Table
          :titles="tableHeaders[card.body]"
          :dataArray="array[card.body]"
        />
      </CollapsedCard>
    </div>
  </div>
</template>

<script>
import userService from '@/services/user.service';
import accountService from '@/services/account.service';
import transactionService from '@/services/transaction.service';
import Table from '@/UI/Table';
import CollapsedCard from '@/components/CollapsedCard';
import {
  usersTableHeader,
  cardsShowList,
  accountsTableHeader,
  transactionsTableHeader
} from '@/_config';

export default {
  data() {
    return {
      tableHeaders: {
        users: usersTableHeader,
        accounts: accountsTableHeader,
        transactions: transactionsTableHeader
      },
      cards: cardsShowList,
      array: {
        users: '',
        accounts: '',
        transactions: ''
      },
      userArray_JSON: []
    };
  },

  async mounted() {
    const users = await userService.getUsersList();
    const accounts = await accountService.getListAccounts();
    const transactions = await transactionService.getTransactions();
    this.array.users = users;
    this.array.accounts = accounts;
    this.array.transactions = transactions;
  },
  components: {Table, CollapsedCard}
};
</script>
