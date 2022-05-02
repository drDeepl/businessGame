<template>
  <Tab :tabs="tabs" :onClickTab="onClickTab">
    <component
      v-bind:is="currentTabComponent"
      v-bind:titles="tableHeaders[currentTabComponent]"
      v-bind:dataArray="array[currentTabComponent]"
    >
      <button class="admin-tab">Редактировать</button>
    </component>
  </Tab>
</template>

<script>
import Table from '@/UI/Table';
import Tab from '@/components/Tab';
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
// TODO: Добавить модальное окно по клику
export default {
  data() {
    return {
      test: '',
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
    onClickTab(data) {
      this.currentTab = data.tabUrl;
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
  components: {
    users: Table,
    teams: Table,
    accounts: Table,
    transactions: Table,
    Tab: Tab
  }
};
</script>
