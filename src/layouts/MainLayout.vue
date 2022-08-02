<template>
  <Load v-if="$store.getters['user/GET_STATE_getUser']" />
  <div v-else :class="sidebar.className + ' mainLayout'" id="wrapper">
    <!-- <a href="#" id="menu-toggle"> -->

    <aside id="sidebar-wrapper" class="aside-sidebar">
      <div class="sidebar-container">
        <p id="sidebar-tittle" class="user-info">{{ title }}</p>
        <ul class="user-info" v-if="sidebarUserInfo.role.value == 'player'">
          <!-- TODO: Оформить красивый вывод информации -->
          <v-skeleton-loader
            v-if="loading.sidebarUserInfo"
            type="text@4"
          ></v-skeleton-loader>
          <li
            v-else
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
          class="mainLayout-sidebar-row"
          v-for="key in sidebar.links"
          :key="key.url"
          @click.prevent="onClickTab"
        >
          <span @click.prevent="setActiveTab(key.title)">
            <router-link :to="key.url">
              <span class="mainLayout-sidebar-row-text">{{ key.title }}</span>
            </router-link>
          </span>
        </li>
        <li class="sidebar-logout mainLayout-sidebar-row">
          <a class="sidebar-link" href @click.prevent="OnLogOut">Выйти </a>
        </li>
      </ul>
    </aside>

    <!-- INFO: Page Content -->
    <div id="page-content-wrapper">
      <button class="toggle-button" @click.prevent="onClickMenu">
        <svg class="toggle-icon">
          <line class="toggle-line" x1="9" x2="27" y1="11" y2="11" />
          <line class="toggle-line" x1="11" x2="25" y1="18" y2="18" />
          <line class="toggle-line" x1="13" x2="23" y1="25" y2="25" />
        </svg>
      </button>
      <nav class="nav-bar"></nav>
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
import Product from '@/store/models/Product';
import Load from '@/UI/Load.vue';
// import Product from '@/store/models/Product';
// import ProductKit from '@/store/models/ProductKit';
export default {
  data() {
    return {
      test: '',
      title: app.title,
      userId: 0,
      loading: {
        main: this.$store.getters['mainLayout/LOADING'],
        sidebarUserInfo: true,
      },
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
        links: [],
      },
      tab: {
        activeTab: '',
      },
    };
  },
  async created() {
    // TODO [20.07.2022]: переделать страницу авторизации
    // TODO [20.07.2022]: оформить покупку продуктового набора через состояния

    // NOTE: 'Что должно происходить здесь
    // NOTE: 0.Проверка на авторизацию
    // NOTE: 1.Получение access токена
    // NOTE: 2.Извлечение из него id пользователя
    // NOTE: 3.Получение информации о пользователе для отображения её в сайдбаре
    // NOTE: 4.Если админ, то показать панель админа
    // NOTE: 5.Отобразить имя, команду, баланс пользователя'
    console.warn(User.api());

    if (this.$store.state.auth.status.loggedIn) {
      const username = this.currentUser.username;
      const responseUser = await User.api().getUserByUsername(username);

      const dataUser = responseUser.response.data;
      const roleUser = dataUser.role.toLowerCase();
      await Product.api().getListProducts();

      this.sidebar.links =
        this.$store.getters['user/GET_SIDEBAR_LINKS_BY_ROLE'](roleUser);
      if (roleUser == 'player') {
        const teamId = dataUser.team;
        console.error('DATA USER\n', dataUser);
        const resTeam = await Team.api().getTeam(teamId);
        const dataTeam = resTeam.response.data;
        const resAccount = await Account.api().getAccount(dataTeam.account);
        const dataAccount = resAccount.response.data;
        this.sidebarUserInfo.username.value = username;
        this.sidebarUserInfo.role.value = roleUser;
        this.sidebarUserInfo.team.value = dataTeam.name;
        this.sidebarUserInfo.balance.value = dataAccount.balance;
        this.loading.sidebarUserInfo = false;
      }

      // console.warn('USER_DATA\n', data);
      // await User.api().getListUsers();
      // await Team.api().getListTeams();
      // await Account.api().getListAccounts();
      // await ProductKit.api().getListProductKits();
      // await Product.api().getListProducts();
      // console.warn('MAINLAYOUT: created');
      // const users = User.all();
      // console.error(users);
      // const userData = User.query().where('username', username).first();
      // let roleUser = userData.role;
      // const links =
      //   this.$store.getters['user/GET_SIDEBAR_LINKS_BY_ROLE'](roleUser);
      // this.sidebar.links = links;
      // if (userData.role.toLowerCase() == 'player') {
      //   const teamId = userData.team;
      //   const teamName = this.$store
      //     .$db()
      //     .model('teams')
      //     .query()
      //     .where('id', teamId)
      //     .first().name;
      //   console.error(teamName);
      //   const teamBalance = this.$store
      //     .$db()
      //     .model('accounts')
      //     .query()
      //     .where('id', userData.account)
      //     .first().balance;

      //   this.sidebarUserInfo.username.value = username;
      //   this.sidebarUserInfo.role.value = roleUser;
      //   this.sidebarUserInfo.team.value = teamName;
      //   this.sidebarUserInfo.balance.value = teamBalance;
      // }
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
  components: {Load},
};
</script>
