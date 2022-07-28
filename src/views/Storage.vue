<template>
  <div>
    <v-tabs>
      <v-tab>продуктовые наборы</v-tab>
      <v-tab-item>
        <!-- <div v-for="productKit in productKits" :key="productKit.id">
          {{ productKit }}
        </div> -->
        <!-- TODO: -->
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import ProductKitStorage from '@/store/models/ProductKitStorage';
import User from '@/store/models/User';
import ProductKitStore from '@/UI/ProductKitStore.vue';

// TODO: [28.07.2022] отображение продуктового набора в виде карточки + заголовки
export default {
  data() {
    return {
      loading: false,
      arrays: {productKits: []},
    };
  },
  computed: {
    currentUserData() {
      let username = this.$store.state.auth.user.username;
      console.warn('Storage.vue\nusername ' + username);
      return this.$store
        .$db()
        .model('users')
        .query()
        .where('username', username)
        .first();
    },
    productKits() {
      return this.$store.$db().model('productKits_storage').query().all();
    },
  },
  methods: {},
  async created() {
    const username = this.$store.state.auth.user.username;
    const userData = (await User.api().getUserByUsername(username)).response
      .data;
    console.error(userData);
    const team_id = userData.team;
    console.error(team_id);
    const response = await ProductKitStorage.api().getListProductKits(team_id);
    const listProductKitTeam = response.response.data;
    console.warn(listProductKitTeam);
    // this.arrays.productKits = productKits;
  },
  components: {
    ProductKitStore,
  },
};
</script>

<style></style>
