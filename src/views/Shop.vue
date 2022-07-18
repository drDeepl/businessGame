<template>
  <div class="shop-container">
    <!-- <Form> </Form> -->
    <ProductCard
      v-for="offer in offers"
      :key="offer.id"
      :item="offer"
      :modelItem="card.cardOffer.model"
      :showLabel="true"
    >
    </ProductCard>
  </div>
</template>

<script>
// import Form from '@/UI/Form.vue';
import ProductCard from '@/UI/ProductCard.vue';
import Offer from '@/store/models/Offer';
import SaleOffer from '@/models/model.offer.sale';
export default {
  async created() {
    const jwt = this.$store.state.auth.user.access;
    await Offer.api().getListSaleOffers(jwt);
  },
  data() {
    return {
      title: '',
      cards: {
        cardOffer: {
          model: new SaleOffer(),
        },
      },
    };
  },
  computed: {
    offers() {
      return this.$store.$db().model('offers').all();
    },
  },
  methods: {},
  components: {ProductCard},
};
</script>
