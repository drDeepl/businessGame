<template>
  <div class="customer-page-wrapper">
    <Load v-if="false" />
    <div v-else-if="arrays.teamProducts.length == 0">
      <p>тут есть что исправить</p>
    </div>
    <div v-else>
      {{ products }}
      <DialogError></DialogError>
    </div>
  </div>
</template>

<script>
import DialogError from '@/UI/DialogError.vue';

import Load from '@/UI/Load.vue';
export default {
  data() {
    return {
      arrays: {
        teamProducts: {},
        teams: {},
      },
    };
  },
  async created() {
    // FIX: Получить список команд
    // FIX: Получить список готовых продуктов у каждой команды
    // FIX: Соединить в один массив с объектами вида {"nameTeam": {id: int, products: []}}
    let teams = await this.$store.dispatch('team/getTeams');
    console.warn(teams);
    let teamProduct = Object();
    for (let i = 0; i < teams.length; i++) {
      let item = teams[i];
      console.warn(item);
      const teamProducts = await this.$store.dispatch(
        'products/getListProductInStore',
        item.id
      );
      if (teamProducts.length > 0) {
        teamProduct[item.name] = teamProducts;
      }
    }
    console.warn(teamProduct);
    this.arrays.teamProducts = teamProduct;
    // this.$store.commit('customer/SET_TEAM_PRODUCTS', mapTeams);
  },
  computed: {
    products() {
      return this.arrays.teamProducts;
    },
  },
  methods: {},

  components: {Load, DialogError},
};
</script>
