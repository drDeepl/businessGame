<template>
  <div class="customer-page-wrapper layout-showcase">
    <Load v-if="render.main"></Load>
    <div v-else>
      <v-card-title></v-card-title>
    </div>
  </div>
</template>

<script>
import Load from '@/UI/Load.vue';

export default {
  components: {Load},

  data() {
    return {
      alert: {
        newOfferSale: {
          active: false,
          offer: null,
        },

        success: {active: false, message: null},
        error: {active: false, message: null},
        load: {newOffer: false, success: false, error: false},
      },
      model: {},
      render: {main: false},
    };
  },
  watch: {
    async 'alert.newOfferSale.offer'(offer) {
      // FIX: Добавить в оффер название продукта
      console.log('NEW OFFER SALE: ', offer);
      if (offer) {
        const response = await this.$store.dispatch(
          'productKit/getProductFromProductKit',
          offer.product_kit
        );
        const trader = await this.$store.dispatch('user/getUser', offer.trader);

        if (response.error) {
          this.alert.error.active = true;
          this.alert.error.message = response.message;
        } else {
          const product = response.data;
          this.alert.newOfferSale.offer.product_kit = product.name;
          this.alert.newOfferSale.offer.trader = trader.username;
          this.alert.newOfferSale.active = true;
          console.log('PRODUCT', product);
        }
      }
    },
  },
  async created() {
    this.render.main = true;

    this.render.main = false;
  },

  computed: {},
  methods: {
    
  },
};
</script>
