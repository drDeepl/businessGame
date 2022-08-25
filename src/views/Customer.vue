<template>
  <div class="customer-page-wrapper">
    <Load v-if="offersPurchase.length != 0" />
    <div v-else class="cards-container">
      <!-- <OfferCard></OfferCard> -->
    </div>
  </div>
</template>

<script>
import PurchaseOffer from '@/models/model.offer.purchase';

import OfferCard from '@/UI/OfferCard.vue';
import Load from '@/UI/Load.vue';
export default {
  data() {
    return {
      cards: {
        offerPurchase: {
          frontCardModel: new PurchaseOffer(),
        },
      },
    };
  },
  async created() {
    await this.$store.dispatch('offer/getOffersPurchase');
  },
  computed: {
    offersPurchase() {
      const listOffersPurchase = this.$store
        .$db()
        .model('offersPurchase')
        .query()
        .get();
      return listOffersPurchase;
    },
  },
  methods: {
    getProduct(productId) {
      console.warn('CUSTOMER: getProduct');
      console.warn(productId);
    },
  },

  components: {Load},
  com: {OfferCard},
};
</script>
