<template>
  <div class="customer-page-wrapper layout-showcase">
    <Load v-if="render.main"></Load>
    <div v-else>
      <v-card-title></v-card-title>
    </div>
  </div>
</template>

<script lang="js">
import Load from '@/UI/Load.vue';



export default {
  components: {Load, },

  data() {
    return {
      alert: {
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
      if(offer){
        console.warn("new offer alert")
        console.log(offer)
        this.alert.newOfferPurchase.active =true;

      }
      return

  }
  },
  async created() {
    this.render.main = true;

    this.render.main = false;
  },

  computed: {},
  methods: {},


};
</script>
