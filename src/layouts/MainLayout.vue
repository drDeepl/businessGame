<template>
  <div :class="sideBar.className" id="wrapper">
    <div>
      <li v-for="row in Object.keys(test)" :key="row">
        {{ row }}: {{ test[row] }}
      </li>
    </div>
    <button @click.prevent="onClickUpdateRole(1, 'admin')">updateRole</button>
    <Form :inputs="testArrayInput" :selects="testArraySelect" />
    <aside id="sidebar-wrapper">
      <div class="container">
        <p id="sidebar-tittle" class="user-info">{{ title }}</p>
        <ul class="user-info">
          <li
            v-for="row in Object.keys(sidebarUserInfo)"
            :key="row.username"
            :id="row"
          >
            {{ sidebarUserInfo[row] }}
          </li>
        </ul>
        <hr id="sideBarWrapper" />
      </div>
      <ul class="sidebar-nav">
        <li v-for="link in sideBar.links" :key="link.title">
          <span @click.prevent="setActiveTab(link.title)">
            <router-link :to="link.url">
              <font-awesome-icon :icon="link.icon" />
              {{ link.title }}
            </router-link>
          </span>
        </li>
        <li class="sidebar-logout">
          <a class="sidebar-link" href @click.prevent="OnLogOut">
            <font-awesome-icon icon="sign-out-alt" />Выйти
          </a>
        </li>
      </ul>
    </aside>

    <!-- Page Content -->
    <div id="page-content-wrapper">
      <nav class="nav-bar">
        <a href="#" id="menu-toggle" @click.prevent="onClickMenu">
          <svg
            class="button-toggle"
            width="35"
            height="35"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke-linecap="butt"
            stroke-linejoin="arcs"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </a>
      </nav>
      <div class="tb-container">
        <span class="tb">{{ tab.activeTab }}</span>
      </div>
      <div class="wrapper">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="content-wrapper">
                <router-view />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: Добавить динамическое изменение компонентов
import {
  links,
  adminSidebarManage,
  app,
  rowUpdateUser,
  selectUpdateUser
} from '@/_config';
import userService from '@/services/user.service';
import teamService from '@/services/team.service';
import accountService from '@/services/account.service';
import {isAdmin} from '@/helpers/admin.helper';
import Form from '@/UI/Form';
export default {
  data() {
    return {
      test: '',
      testArrayInput: rowUpdateUser,
      testArraySelect: selectUpdateUser,
      title: app.title,
      userRole: '',
      sidebarUserInfo: {
        team: '',
        username: '',
        balance: ''
      },
      sideBar: {
        isActive: false,
        className: '',
        template: 'Деловая игра',
        links: links
      },
      admin: {
        isAdmin: false,
        adminLinks: adminSidebarManage
      },
      tab: {
        activeTab: ''
      }
    };
  },
  async mounted() {
    const accessToken = this.currentUser.access;
    const userId = userService.getUserId(accessToken);
    const userData = await userService.getUserInfo(userId);
    this.test = userData;
    this.admin.isAdmin = isAdmin(userData.role);
    const teamId = userData.team;
    this.sidebarUserInfo.username = userData.username;
    const teamData = await teamService.getDataTeam(teamId);
    this.sidebarUserInfo.team = teamData.name;
    const accountId = userData.account;
    const userBalance = await accountService.getBalance(accountId);
    this.sidebarUserInfo.balance = userBalance;

    // }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentTab() {
      return this.$route.params;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    },
    showModeratorBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_MODERATOR');
      }

      return false;
    }
  },
  methods: {
    async onClickMenu() {
      this.sideBar.isActive = !this.sideBar.isActive;
      if (this.sideBar.isActive) {
        console.log('Open Menu');

        this.sideBar.className = 'menuDisplayed';
      } else {
        this.sideBar.className = '';
      }
    },
    setActiveTab(title) {
      return (this.tab.activeTab = title);
    },
    OnLogOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
    onMyProfile() {
      this.$router.push('/');
    },
    onClickJWT() {
      this.test = this.userData;
    },
    onClickUpdateRole(user_id, role) {
      userService.updateDataUser(user_id, role);
    }
  },
  components: {Form}
};
</script>
