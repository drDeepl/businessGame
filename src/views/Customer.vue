<template>
  <div class="customer-page-wrapper layout-showcase">
    <Load v-if="render.main"></Load>
    <v-card-title>В разработке</v-card-title>
  </div>
</template>

<script>
import Load from '@/UI/Load.vue';
import OfferApi from '@/api/offer.api';
export default {
  data() {
    return {
      render: {main: false},
    };
  },
  async created() {
    this.render.main = true;
    this.connection = new WebSocket('ws://localhost:8000/ws/');
    this.connection.onmessage = () => {
      OfferApi.offersPurchase().then((response) => {
        console.warn('OFFERS PURCHASE\n', response.data);
      });
    };
    this.render.main = false;
  },
  computed: {},
  methods: {},

  components: {Load},
};
</script>
