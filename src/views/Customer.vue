<template>
  <div class="client-page-container">
    <Load v-if="$store.getters['user/GET_STATE_getUser']" />
    <div v-else>
      <v-tabs>
        <v-tab>Продукты</v-tab>
        <v-tab-item>
          <Load v-if="$store.getters['products/GET_STATE_getProductsStore']" />
          <div v-else class="client-products-tab"></div>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
// import ProductStorage from '@/store/models/ProductStorage';
// import Team from '@/store/models/Team';
// import Account from '@/store/models/Account';
import ModelProduct from '@/models/model.product';
import ModelProductStore from '@/models/model.product.store';
import Load from '@/UI/Load';
// import ProductKitStoreCard from '@/UI/ProductKitStoreCard';
export default {
  data() {
    return {
      loading: {
        getUser: null,
        products: false,
      },
      cards: {
        product: {
          modelItem: new ModelProductStore(),
          childModelItem: new ModelProduct(),
        },
      },
    };
  },
  async created() {
    // TODO: получение всех продуктов от всех команд с апи
    // FIX: Зацикливание на получении данных пользователя
    const username = this.$store.state.auth.user.username;
    console.warn(username);
    const user = await this.$store.dispatch(
      'user/getUserDataByUsername',
      username
    );
    console.warn(user);
    // const usersRole = user.role.toLowerCase();
    // console.warn(usersRole);
    // if (usersRole == 'customer') {
    //   console.warn('STORAGE.VUE: created');
    //   // console.warn('Team: loading\n', Team);
    //   // console.warn('Account: loading\n', Account);
    //   this.$router.push('/' + usersRole);
    // } else {
    //   this.$router.push('/');
    // }
  },
  computed: {
    // currentUserData() {
    //   const username = this.$store.state.auth.user.username;
    //   return this.$store
    //     .$db()
    //     .model('users')
    //     .query()
    //     .where('username', username)
    //     .first();
    // },
  },
  methods: {},
  // components: {ProductKitStoreCard},
  components: {Load},
};
</script>
