<template>
  <div class="md-body">
    <Load v-if="render.main"></Load>
    <div v-else>
      <v-card-title>Привет, {{ currentUserData.username }}</v-card-title>
      <!-- <OfferTable
        :offers="arrays.offersSaleDone"
        :modelOffer="model.saleOffer.props"
        :fieldToShow="['trader', 'product_kit', 'price']"
      >
        
      </OfferTable> -->
      <v-card class="offers-table">
        <v-list-item class="row-table-offers">
          <v-list-item-content
            v-for="label in model.saleOffer.fieldToShow"
            :key="`th_${label}`"
          >
            <span class="row-table-offers-value row-table-header">{{
              model.saleOffer.props[label]
            }}</span>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          class="row-table-offers"
          v-for="offerSale in arrays.offersSaleDone"
          :key="offerSale.id"
        >
          <OfferTableRow
            :offer="offerSale"
            :fieldToShow="model.saleOffer.fieldToShow"
          ></OfferTableRow>
        </v-list-item>
      </v-card>
    </div>
  </div>
</template>

<script>
// import OfferApi from '@/api/offer.api';
import {mapGetters} from 'vuex';
import OfferApi from '@/api/offer.api';
import Load from '@/UI/Load.vue';
import OfferTableRow from '@/components/OfferTableRow.vue';
import SaleOffer from '@/models/model.offer.sale';
export default {
  components: {Load, OfferTableRow},
  data() {
    return {
      render: {main: false},
      currentUserData: null,
      connection: new WebSocket('ws://localhost:8000/ws/'),
      model: {saleOffer: SaleOffer},
      arrays: {
        offersSaleDone: [],
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

      const offersSaleDone = await this.$store.dispatch(
        'offer/getSaleOffersDone',
        1
      );
      this.arrays.offersSaleDone = offersSaleDone;

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
