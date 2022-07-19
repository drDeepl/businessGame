<template>
  <div class="shop-container">
    <!-- <Form> </Form> -->
    <div v-if="offers.length > 0" class="cards-container">
      <ProductCard
        v-for="offer in offers"
        :key="offer.id"
        :item="changeTrader(offer)"
        :modelItem="cards.cardOffer.model"
        :showLabel="true"
      >
        <div
          class="product-card-text"
          v-if="currentUserData.role.toLowerCase() == 'manufacturer'"
        >
          <v-btn class="ma-1" outlined rounded color="#ee5544"> купить</v-btn>
        </div>
      </ProductCard>
    </div>
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
    const user = this.$store.state.auth.user;
    console.error(user);
    console.warn('USERNAME');
    const us = await this.$store.getters['auth/initState'].user;
    console.warn(us);
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
    changeTrader() {
      return (offer) => {
        const trader = this.$store
          .$db()
          .model('users')
          .query()
          .where('id', offer.trader)
          .first();
        offer.trader = trader.username;
        return offer;
      };
    },
    changeProductKit() {
      return (offer) => {
        console.warn('SHOP: WATCH: changeProductKit');
        console.warn(offer.product_kit);
        const productKit = this.$store
          .$db()
          .model('productKits')
          .query()
          .where('id', offer.product_kit)
          .first();
        const productName = this.$store
          .$db()
          .model('products')
          .query()
          .where('id', productKit.product)
          .first();
        offer.product_kit = productName;
        return offer;
      };
    },
    currentUser() {
      return this.$store.getters['auth/initState'].user;
    },
    currentUserData() {
      let username = this.currentUser.username;
      return this.$store
        .$db()
        .model('users')
        .query()
        .where('username', username)
        .first();
    },
  },
  methods: {},
  components: {ProductCard},
};
</script>
