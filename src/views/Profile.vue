<template>
  <div class="md-body">
    <!-- put props -->
    <Card :id="getUserId" :username="currentUser.username" />
  </div>
</template>

<script>
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
      console.log('Profile.vue: ' + 'getUserId');
      const userId = this.$store.state.auth.user.user_id;
      return userId;
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
