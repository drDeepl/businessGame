<template>
  <div :class="sideBar.className" id="wrapper">
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
        <li
          v-for="link in sideBar.links"
          :key="link.url"
          @click.prevent="onClickTab"
        >
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
import {links, adminSidebar, app} from '@/_config';

export default {
  data() {
    return {
      test: '',
      title: app.title,
      userId: 0,
      sidebarUserInfo: {
        team: '',
        username: '',
        balance: ''
      },
      sideBar: {
        isActive: false,
        className: 'sidebar-container',
        template: 'Деловая игра',
        links: links
      },
      admin: {
        isAdmin: false,
        adminLinks: adminSidebar
      },
      tab: {
        activeTab: ''
      }
    };
  },
  async created() {
    // TODO: Перенести логику в store
    console.log('MainLayout.vue: Created');
    if (this.$store.state.auth.status.loggedIn) {
      ('Что должно происходить здесь\
    0.Проверка на авторизацию\
    1.Получение access токена\
    2.Извлечение из него id пользователя\
    3.Получение информации о пользователе для отображения её в сайдбаре\
    4.Если админ, то показать панель админа\
    5.Отобразить имя, команду, баланс пользователя');
      const userId = this.$store.state.auth.user.user_id;
      this.$store.dispatch('user/getUserInfo', userId);
      this.$store.state.user.userInfo;
    } else {
      this.$router.push('/');
      console.log('Нахер отсюда!');
    }
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
    onClickTab() {
      this.sideBar.className = 'sidebar-container';
      this.sideBar.isActive = !this.sideBar.isActive;
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
    }
  }
};
</script>
