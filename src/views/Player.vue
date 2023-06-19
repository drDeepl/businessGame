<template>
  <div>
    <div class="player-layout">
      <p>
        <span v-if="currentUserData"
          >Привет, {{ currentUserData.username }}
        </span>
        <v-skeleton-loader v-else type="list-item"></v-skeleton-loader>
        <!-- {{ currentUserData }} -->
        <span>сделать показ офферов</span>
      </p>
    </div>
  </div>
</template>

<script>
// import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      currentUserData: null,
      render: {
        page: true,
      },
      arrays: {
        offersSale: [],
      },
    };
  },

  computed: {
    // ...mapGetters({}),
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  async created() {
    this.render.page = true;
    if (this.currentUser) {
      const currentUsername = this.currentUser.username;
      console.log(currentUsername);
      const responseUser = await this.$store.dispatch(
        'user/getUserDataByUsername',
        currentUsername
      );
      const currentUserData = responseUser.data;
      this.currentUserData = currentUserData;

      const responseOffersSale = await this.$store.dispatch(
        'offer/getOffersSale',
        this.currentUserData.team
      );
      const offersSale = responseOffersSale.data;
      this.arrays.offersSale = offersSale;
    } else {
      this.$router.push('/login');
    }

    this.render.page = false;
  },
};
</script>
