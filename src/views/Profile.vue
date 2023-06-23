<template>
  <div class="md-body">
    <v-card>
      <v-card-title class="d-flex justify-center">
        <v-skeleton-loader
          v-if="render.main"
          type="text"
          class="loader-text-layout"
        ></v-skeleton-loader>
        <span v-else>Привет, {{ currentUserData.username }}</span>
      </v-card-title>
      {{ arrays.offersPurchase }}
    </v-card>
  </div>
</template>

<script>
// import OfferApi from '@/api/offer.api';
import {mapGetters} from 'vuex';
import OfferApi from '@/api/offer.api';
export default {
  data() {
    return {
      render: {main: false},
      currentUserData: null,
      connection: new WebSocket('ws://localhost:8000/ws/'),
      offerPurchase: {
        offer: null,
      },
      arrays: {
        offersPurchase: [],
      },
    };
  },

  async created() {
    this.render.main = true;

    if (this.currentUser) {
      const responseUser = await this.$store.dispatch(
        'user/getUserDataByUsername',
        this.currentUser.username
      );
      const currentUserData = responseUser.data;
      this.currentUserData = currentUserData;
      if (currentUserData.role == 'CUSTOMER') {
        console.log('USER IS CUSTOMER');
        this.connection.onmessage = () => {
          OfferApi.offersPurchase().then((response) => {
            console.log('PROFILE: OFFERS PURCHASE\n', response.data);
            const currentOfferPurchase = response.data.at(-1);
            const offerId = currentOfferPurchase.id;
            OfferApi.offerPurchaseToAwait(offerId).then(
              (responseOfferAwaited) => {
                console.error('CHANGE STATE OFFER');
                this.arrays.offersPurchase.push(responseOfferAwaited.data);
              }
            );
          });
        };
      }
    } else {
      this.$router.push('/');
    }
    this.render.main = false;
  },
  computed: {
    ...mapGetters({
      offersPurchase: 'profile/GET_OFFERS_PURCHASE',
    }),

    currentUser() {
      return this.$store.state.auth.user;
    },
  },
};
</script>
