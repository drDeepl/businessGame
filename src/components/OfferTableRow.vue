<template>
  <div class="row-table-offers">
    <v-list-item-content v-for="fieldOffer in fieldToShow" :key="fieldOffer">
      <Load v-if="render" :size="'20'" :color="'grey'"></Load>
      <span v-else class="row-table-offers-value">{{ offer[fieldOffer] }}</span>
    </v-list-item-content>
  </div>
</template>

<script>
import Load from '@/UI/Load.vue';
export default {
  components: {Load},
  props: {
    offer: {type: Object, required: true},
    fieldToShow: {type: Array, required: true},
  },
  data() {
    return {
      render: false,
    };
  },
  async created() {
    this.render = true;
    const user = await this.$store.dispatch('user/getUser', this.offer.trader);
    if (this.offer['team']) {
      const team = await this.$store.dispatch(
        'team/getDataTeam',
        this.offer.team
      );
      this.offer.team = team.name;
    }
    if (this.offer['to_customer']) {
      const customer = await this.$store.dispatch(
        'user/getUser',
        this.offer.to_customer
      );
      this.offer.to_customer = customer.username;
    }
    if (this.offer['product']) {
      const product = await this.$store.dispatch(
        'products/getProduct',
        this.offer.product
      );
      this.offer.product = product.name;
    } else {
      const responseProduct = await this.$store.dispatch(
        'productKit/getProductFromProductKit',
        this.offer.product_kit
      );

      this.offer.product_kit = responseProduct.data.name;
    }
    this.offer.trader = user.username;
    this.render = false;
  },
};
</script>
