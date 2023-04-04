<template>
  <div class="customer-page-wrapper layout-showcase">
    <Load v-if="render.main"></Load>
    <v-card-title>В разработке</v-card-title>
  </div>
</template>

<script>
import Load from '@/UI/Load.vue';

export default {
  data() {
    return {
      render: {main: false},
    };
  },
  async created() {
    this.render.main = true;

    this.render.main = false;
  },
  computed: {},
  methods: {},

  components: {Load},
};
</script>
