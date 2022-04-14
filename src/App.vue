<template>
  <div id="app">
    <div class="container">
      <router-view class="container" />
    </div>
  </div>
</template>

<script>
import EventBus from './common/EventBus';

export default {
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
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
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  },
  mounted() {
    EventBus.on('logout', () => {
      this.logOut();
    });
  },
  beforeDestroy() {
    EventBus.remove('logout');
  }
};
</script>
<style lang="scss"></style>
