<template>
  <div class="md-body">
    <v-card-title class="d-flex justify-center">
      Привет, {{ currentUserData.username }}
    </v-card-title>
    <v-card>
      {{ offersPurchase }}
    </v-card>
  </div>
</template>

<script>
// import OfferApi from '@/api/offer.api';
import {mapGetters} from 'vuex';
export default {
  data() {
    return {
      arrays: {
        offersPurchase: [],
      },
    };
  },
  async created() {
    // this.connection = new WebSocket('ws://localhost:8000/ws/');
    // this.connection.onmessage = () => {
    //   OfferApi.offersPurchase().then((response) => {
    //     console.log('OFFERS PURCHASE\n', response.data);
    //     const currentOfferPurchase = response.data.at(-1);
    //     this.arrays.offersPurchase.push(currentOfferPurchase);
    //     console.log('CURRENGT OFFER PURCHASE\n', currentOfferPurchase);
    //   });
    // };
  },
  computed: {
    ...mapGetters({
      currentUserData: 'user/GET_CURRENT_USER_DATA',
      offersPurchase: 'profile/GET_OFFERS_PURCHASE',
    }),
  },
};
</script>
