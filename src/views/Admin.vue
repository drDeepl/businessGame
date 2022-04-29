<template>
  <div class="tab-conatiner">
    <div class="admin-tab__wrapper">
      <button
        class="admin-tab"
        v-for="tab in tabs"
        :key="tab.url"
        @click.prevent="changeTab(tab.url)"
      >
        {{ tab.title }}
      </button>
    </div>
    <component
      v-bind:is="currentTabComponent"
      v-bind:titles="tableHeaders[currentTabComponent]"
      v-bind:dataArray="array[currentTabComponent]"
    >
      <button class="admin-tab">Редактировать</button>
    </component>
  </div>
</template>

<script>
import Table from '@/UI/Table';
import userService from '@/services/user.service';
import accountService from '@/services/account.service';
import transactionService from '@/services/transaction.service';
import teamService from '@/services/team.service';
import {
  usersTableHeader,
  cardsShowList,
  accountsTableHeader,
  transactionsTableHeader,
  teamsTableHeader,
  adminTabs
} from '@/_config';
// TODO: Добавить возможность изменять данные в таблице
export default {
  data() {
    return {
      currentTab: '',
      tabs: adminTabs,
      tableHeaders: {
        users: usersTableHeader,
        accounts: accountsTableHeader,
        transactions: transactionsTableHeader,
        teams: teamsTableHeader
      },
      cards: cardsShowList,
      array: {
        users: '',
        accounts: '',
        transactions: '',
        teams: ''
      },
      userArray_JSON: []
    };
  },
  computed: {
    currentTabComponent() {
      return this.currentTab;
    }
  },
  methods: {
    changeTab(url) {
      return (this.currentTab = url);
    }
  },
  async mounted() {
    const users = await userService.getUsersList();
    const accounts = await accountService.getListAccounts();
    const transactions = await transactionService.getTransactions();
    const teams = await teamService.getTeams();
    this.testTeams = teams;
    this.array.users = users;
    this.array.accounts = accounts;
    this.array.transactions = transactions;
    this.array.teams = teams;
  },
  // Немного костылей в код))))))
  components: {users: Table, teams: Table, accounts: Table, transactions: Table}
};
</script>
