<template>
  <div>
    <v-tabs>
      <v-tab>продуктовые наборы</v-tab>
      <v-tab-item>
        <div v-for="productKit in arrays.productKits" :key="productKit.id">
          {{ productKit }}
        </div>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import ProductKitStorage from '@/store/models/ProductKitStorage';
import User from '@/store/models/User';
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
  },
  methods: {},
  async created() {
    const username = this.$store.state.auth.user.username;
    const userData = (await User.api().getUserByUsername(username)).response
      .data;
    console.error(userData);
    const team_id = userData.team;

    const response = await ProductKitStorage.api().getListProductKits(team_id);
    console.warn(response);
    // this.arrays.productKits = productKits;
  },
};
</script>

<style></style>
