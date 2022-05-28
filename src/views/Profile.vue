<template>
  <div class="md-body">
    <!-- put props -->
    <Card :id="getUserId" :username="currentUser.username" />
  </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
import Card from '@/UI/Card';
export default {
  components: {Card}, // <=> {Card: Card}
  // TODO: Сделать динамическое изменение items
  data() {
    return {};
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },

    getUserId() {
      const data = this.$store.state.auth.user.access;
      const decodeAccess = VueJwtDecode.decode(data);
      return decodeAccess.user_id;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/');
    }
  }
};
</script>
<!--
<script>


export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
};
</script> 
-->
