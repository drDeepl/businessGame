<template>
  <div class="wrapper">
    <div class="card" v-for="card in cards" :key="card.body">
      <CollapsedCard :title="card.title" :id="card.body">
        {{ array[card.body] }}
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
        accounts: ['1', '2'],
        transactions: ['1', '2']
      },
      userArray_JSON: []
    };
  },

  async mounted() {
    //   TODO: Добавить отображение списка транзакций
    const users = await userService.getUsersList();
    const accounts = await accountService.getListAccounts();
    this.array.users = users;
    this.array.accounts = accounts;
    this.array.transactions = accounts;
  },
  components: {Table, CollapsedCard}
};
</script>
