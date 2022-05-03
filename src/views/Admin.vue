<template>
  <Tab :tabs="tabs" :onClickTab="onClickTab">
    <component
      v-bind:is="currentTabComponent"
      v-bind:titles="tableHeaders[currentTabComponent]"
      v-bind:dataArray="array[currentTabComponent]"
      :onClickTableRow="onClickTableRow"
    >
      <button class="admin-tab">Редактировать</button>
    </component>
    <div v-if="modalWindow.isActive">
      <modalWindow
        :title="currentTabComponent"
        :styleForActivatedModal="modalWindow.styleForActivated"
        :showModal="showModal"
      >
        <Form
          :data="modalWindow.data"
          :labels="tableHeaders[currentTabComponent]"
        />
      </modalWindow>
    </div>
  </Tab>
</template>

<script>
import Table from '@/UI/Table';
import Tab from '@/components/Tab';
import Form from '@/UI/Form';
import modalWindow from '@/UI/modalWindow';
import userService from '@/services/user.service';
import accountService from '@/services/account.service';
import transactionService from '@/services/transaction.service';
import teamService from '@/services/team.service';
import {
  usersTableHeader,
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
      modalWindow: {
        isActive: false,
        styleForActivatedModal: 'hidden:block',
        data: ''
      },
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
    },
    onClickTableRow(data) {
      this.modalWindow.isActive = true;
      this.modalWindow.data = data.data;
    },
    showModal(data) {
      this.modalWindow.isActive = data.modalisActive;
      this.styleForActivatedModal = data.styleShowModal;
    }
  },
  async created() {
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
    Tab: Tab,
    modalWindow: modalWindow,
    Form: Form
  }
};
</script>
