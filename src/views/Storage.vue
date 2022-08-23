<template>
  <div class="productKit-store-page">
    <v-tabs color="#6C63FF">
      <v-tab>продуктовые наборы</v-tab>
      <v-tab-item>
        <Load v-if="productKits.length == 0" />
        <div v-else>
          <div v-for="productKit in productKits" :key="productKit.id">
            <ProductKitCard
              :nameProduct="getProductName(productKit.product_kit.product)"
              :countProductKits="productKit.count"
              :modelProductKit="cards.productKit.model"
              :productKit="productKit.product_kit"
            >
              <v-card-actions class="store-product-kit-card-actions ma-0 pa-0">
                <v-btn
                  class="ma-0 pa-0 store-product-card-btn"
                  color="deep-orange"
                  text
                  @click="onClickPrepareProduct(productKit.product_kit)"
                >
                  <span>приготовить продукт</span>
                </v-btn>
              </v-card-actions>
              <v-overlay
                :absolute="true"
                color="white"
                :opacity="0.85"
                :value="$store.getters['storageTeam/GET_STATE_CREATE_PRODUCT']"
                class="load-layout"
              >
                <v-progress-circular
                  :rotate="360"
                  :size="100"
                  :width="15"
                  :value="prepareProductKit.progress"
                  color="deep-purple"
                >
                  {{ prepareProductKit.progress }}
                </v-progress-circular>
              </v-overlay>
            </ProductKitCard>
          </div>
        </div>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
// TODO: улучшить дизайн карточки
// TODO: создание продукта из продуктового набора
// TODO: продажу продуктового набора клиенту
import ProductKitStorage from '@/store/models/ProductKitStorage';
import User from '@/store/models/User';
// import ProductKitStore from '@/models/model.productKitStore';
import ProductKit from '@/models/model.productKit';

import Load from '@/UI/Load.vue';
import ProductKitStoreCard from '@/UI/ProductKitStoreCard.vue';

// TODO: [28.07.2022] отображение продуктового набора в виде карточки + заголовки
export default {
  data() {
    return {
      prepareProductKit: {
        timer: 0,
        progress: 0,
      },
      arrays: {productKits: []},
      cards: {
        productKit: {
          model: new ProductKit(),
        },
      },
    };
  },
  async created() {
    const username = this.$store.state.auth.user.username;
    const userData = (await User.api().getUserByUsername(username)).response
      .data;
    console.error(userData);
    const team_id = userData.team;
    console.error(team_id);
    const response = await ProductKitStorage.api().getListProductKits(team_id);

    const listProductKitTeam = response.response.data;
    this.arrays.productKits = listProductKitTeam;
    // this.arrays.productKits = productKits;
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
      return this.arrays.productKits;
    },
    progressBar: {
      get() {
        return this.prepareProductKit.progress;
      },
      set(value) {
        this.prepareProductKit.progress =
          this.prepareProductKit.progress + value;
      },
    },
  },
  methods: {
    async plusProgress(count) {
      this.prepareProductKit.progress = this.prepareProductKit.progress + count;
      console.error(this.prepareProductKit.progress);
    },
    onClickPrepareProduct(productKit) {
      this.$store.commit('storageTeam/SET_CREATE_PRODUCT');
      console.warn('STORAGE: onClickPrepareProduct');
      console.warn(productKit);
      this.$store.dispatch('storageTeam/prepareProduct', 210);
      // let prepareProduct = setInterval(() => this.plusProgress(10), 1000);
      // setTimeout(() => {
      //   clearInterval(prepareProduct);
      // }, 10000);
      // this.$store.commit('storageTeam/SET_CREATE_PRODUCT_COMPLETE');
    },
    getProductName(productId) {
      console.warn('MODULE.STORAGE: prepareProductKit()');
      const product = this.$store
        .$db()
        .model('products')
        .query()
        .where('id', productId)
        .first();
      return product.name;
    },
  },

  components: {
    Load,
    ProductKitCard: ProductKitStoreCard,
  },
};
</script>

<style></style>
