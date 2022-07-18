<template>
  <div :class="sidebar.className" id="wrapper">
    <aside id="sidebar-wrapper" class="aside-sidebar">
      <div class="sidebar-container">
        <p id="sidebar-tittle" class="user-info">{{ title }}</p>
        <ul class="user-info" v-if="sidebarUserInfo.role.value == 'player'">
          <!-- TODO: Оформить красивый вывод информации -->
          <li
            :id="row"
            class="user-info-row"
            v-for="row in Object.keys(sidebarUserInfo)"
            :key="row"
          >
            <span class="sidebar-user-info title">
              <small>{{ sidebarUserInfo[row].title.toLowerCase() }}</small>
            </span>
            <span class="sidebar-user-info value" :id="row">{{
              sidebarUserInfo[row].value.toLowerCase()
            }}</span>
          </li>
        </ul>
        <hr id="sideBarWrapper" />
      </div>
      <ul class="sidebar-nav">
        <li
          v-for="key in sidebar.links"
          :key="key.url"
          @click.prevent="onClickTab"
        >
          <span @click.prevent="setActiveTab(key.title)">
            <router-link :to="key.url">
              {{ key.title }}
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

    <!-- INFO: Page Content -->
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
import {app} from '@/_config';
import User from '@/store/models/User';
import Team from '@/store/models/Team';
import Account from '@/store/models/Account';
export default {
  data() {
    return {
      test: '',
      title: app.title,
      userId: 0,
      sidebarUserInfo: {
        username: {title: 'Имя пользователя', value: ''},
        role: {title: 'Роль', value: ''},
        team: {title: 'Команда', value: ''},
        balance: {title: 'Баланс', value: ''},
      },
      sidebar: {
        isActive: false,
        className: 'sidebar-container',
        template: 'Деловая игра',
        links: [{title: 'Магазин', url: 'shop'}],
      },
      tab: {
        activeTab: '',
      },
    };
  },
  async created() {
    // [11.07.2022]: TODO: Сделать страницу для поставщика

    // NOTE: 'Что должно происходить здесь
    // NOTE: 0.Проверка на авторизацию
    // NOTE: 1.Получение access токена
    // NOTE: 2.Извлечение из него id пользователя
    // NOTE: 3.Получение информации о пользователе для отображения её в сайдбаре
    // NOTE: 4.Если админ, то показать панель админа
    // NOTE: 5.Отобразить имя, команду, баланс пользователя'

    if (this.$store.state.auth.status.loggedIn) {
      const username = this.currentUser.username;
      const jwt = this.currentUser.access;
      await User.api().getListUsers(jwt);
      await Team.api().getListTeams(jwt);
      await Account.api().getListAccounts(jwt);
      console.warn('MAINLAYOUT: created');
      const users = User.all();
      console.error(users);
      const userData = User.query().where('username', username).first();
      let roleUser = userData.role;
      const links =
        this.$store.getters['user/GET_SIDEBAR_LINKS_BY_ROLE'](roleUser);
      this.sidebar.links = links;
      if (userData.role.toLowerCase() == 'player') {
        const teamId = userData.team;
        const teamName = this.$store
          .$db()
          .model('teams')
          .query()
          .where('id', teamId)
          .first().name;
        console.error(teamName);
        const teamBalance = this.$store
          .$db()
          .model('accounts')
          .query()
          .where('id', userData.account)
          .first().balance;

        this.sidebarUserInfo.username.value = username;
        this.sidebarUserInfo.role.value = roleUser;
        this.sidebarUserInfo.team.value = teamName;
        this.sidebarUserInfo.balance.value = teamBalance;
      }
    } else {
      this.$router.push('/');
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentTab() {
      return this.$route.params;
    },

    users() {
      return this.$store.$db().model('users').all();
    },
    sidebarLinks() {
      return this.$store.getters['user/GET_SIDEBAR_LINKS_BY_ROLE'](
        this.sidebarUserInfo.role
      );
    },
  },
  methods: {
    async onClickMenu() {
      this.sidebar.isActive = !this.sidebar.isActive;
      if (this.sidebar.isActive) {
        console.warn('MAINLAYOUT: onClickMenu');
        this.sidebar.className = 'menuDisplayed';
      } else {
        this.sidebar.className = '';
      }
    },

    onClickTab() {
      this.sidebar.className = 'sidebar-container';
      this.sidebar.isActive = !this.sidebar.isActive;
    },
    setActiveTab(title) {
      return (this.tab.activeTab = title);
    },
    OnLogOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    },
    onMyProfile() {
      this.$router.push('/profile');
    },
  },
};
</script>
