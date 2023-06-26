<template>
  <div class="md-body">
    <Load v-if="render.main"></Load>
    <div v-else>
      <v-card-title>Привет, {{ currentUserData.username }}</v-card-title>
    </div>
  </div>
</template>

<script>
// import OfferApi from '@/api/offer.api';
import {mapGetters} from 'vuex';
import OfferApi from '@/api/offer.api';
import Load from '@/UI/Load.vue';
import PurchaseOffer from '@/models/model.offer.purchase';
export default {
  components: {Load},
  data() {
    return {
      render: {main: false},
      currentUserData: null,
      connection: new WebSocket('ws://localhost:8000/ws/'),
      offerPurchaseModel: {
        model: PurchaseOffer,
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
        const offersPurchaseAwaited = await this.$store.dispatch(
          'offer/getOffersPurchaseAwaited',
          currentUserData.id
        );
        console.error(offersPurchaseAwaited);
        this.arrays.offersPurchase = offersPurchaseAwaited;
        this.connection.onmessage = () => {
          OfferApi.offersPurchase().then((response) => {
            console.log('PROFILE: OFFERS PURCHASE\n', response.data);
            const currentOfferPurchase = response.data.at(-1);
            const offerId = currentOfferPurchase.id;
            OfferApi.offerPurchaseSetAwait(offerId).then(
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
