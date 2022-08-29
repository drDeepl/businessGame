<template>
  <div class="customer-page-wrapper">
    <Load v-if="offersPurchase.length != 0" />
    <div v-else-if="offersPurchase.length == 0">
      <p>нет активных предложений о покупке</p>
    </div>
    <div v-else class="cards-container">
      <div v-for="offer in offersPurchase" :key="offer.id">
        <OfferCard
          :traderId="offer.trader"
          :product="getProduct(offer.product).name"
          :frontItem="offer"
          :frontModelItem="cards.offerPurchase.frontCardModel"
        >
          <v-btn color="deep-orange" text @click="onClickBuyProduct(offer)">
            <span>купить</span>
          </v-btn></OfferCard
        >
      </div>
      <DialogError></DialogError>
    </div>
  </div>
</template>

<script>
import PurchaseOffer from '@/models/model.offer.purchase';
import DialogError from '@/UI/DialogError.vue';

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
    await this.$store.dispatch('products/getProducts');
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
      const product = this.$store.$db().model('products').find(productId);
      return product;
    },
    async onClickBuyProduct(offerId) {
      console.warn('CUSTOMER.VUE: onClickBuyOffer');
      this.$store.commit('offer/SET_OFFER_ACQUIRE');
      try {
        await this.$store.dispatch('offer/offerPurchaseAcquire', offerId);
        this.$store.commit('offer/SET_OFFER_ACQUIRE_COMPLETE');
      } catch (error) {
        console.warn('ERROR', error);
      }
    },
  },

  components: {Load, DialogError},
  com: {OfferCard},
};
</script>
