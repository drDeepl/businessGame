<template>
  <div class="md-body">
    <Load v-if="render.main"></Load>
    <div v-else>
      <v-card-title>Привет, {{ currentUserData.username }}</v-card-title>

      <div class="card-transaction-conatiner">
        <v-card class="offers-table">
          <v-card-title>Транзакции для продуктовых наборов</v-card-title>
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
        <v-card>
          <v-card-title>Транзакции для продуктов</v-card-title>

          <v-list-item class="row-table-offers">
            <v-list-item-content
              v-for="label in model.purchaseOffer.fieldToShow"
              :key="`th_${label}`"
            >
              <span class="row-table-offers-value row-table-header">{{
                model.purchaseOffer.props[label]
              }}</span>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            class="row-table-offers"
            v-for="offerSale in arrays.offersPurchaseDone"
            :key="offerSale.id"
          >
            <OfferTableRow
              :offer="offerSale"
              :fieldToShow="model.purchaseOffer.fieldToShow"
            ></OfferTableRow>
          </v-list-item>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
// import OfferApi from '@/api/offer.api';
import {mapGetters} from 'vuex';
// import OfferApi from '@/api/offer.api';
import Load from '@/UI/Load.vue';
import OfferTableRow from '@/components/OfferTableRow.vue';
import SaleOffer from '@/models/model.offer.sale';
import PurchaseOffer from '@/models/model.offer.purchase';
import OfferApi from '@/api/offer.api';

export default {
  components: {Load, OfferTableRow},
  data() {
    return {
      render: {main: false},
      currentUserData: null,
      connection: new WebSocket('ws://localhost:8000/ws/'),
      model: {saleOffer: SaleOffer, purchaseOffer: PurchaseOffer},
      arrays: {
        offersSaleDone: [],
        offersPurchaseDone: [],
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
        'offer/getSaleOffersDone'
      );
      const offersPurchaseDone = await this.$store.dispatch(
        'offer/getPurchaseOffersDone'
      );
      this.arrays.offersPurchaseDone = offersPurchaseDone;
      this.arrays.offersSaleDone = offersSaleDone.reverse();
      this.connection.onmessage = (response) => {
        const dataResponse = JSON.parse(response.data);

        if (dataResponse.type == 'acquired.purchase.offer') {
          console.warn('PURCHASE ACQUIRED');
          OfferApi.getOfferPurchase(dataResponse.id).then(
            (responseOfferPurchase) =>
              this.arrays.offersPurchaseDone.push(responseOfferPurchase.data)
          );
        }
        if (dataResponse.type == 'acquired.sale.offer') {
          OfferApi.getOfferSale(dataResponse.id).then((responseOfferSale) =>
            this.arrays.offersSaleDone.unshift(responseOfferSale.data)
          );
        }
      };
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
