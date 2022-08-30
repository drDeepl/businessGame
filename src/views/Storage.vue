<template>
  <div class="productKit-store-page">
    <v-tabs color="#6C63FF">
      <v-tab>продуктовые наборы</v-tab>
      <v-tab>продукты</v-tab>
      <v-tab-item>
        <Load v-if="productKits.length == 0" />
        <div v-else>
          <div v-for="productKit in productKits" :key="productKit.id">
            <ProductKitCard
              :nameProduct="getProductName(productKit.product_kit.product)"
              :countItems="productKit.count"
              :modelItem="cards.productKit.model"
              :item="productKit.product_kit"
            >
              <v-card-actions class="store-product-kit-card-actions ma-0 pa-0">
                <v-btn
                  class="ma-0 pa-0 store-product-card-btn"
                  color="deep-orange"
                  text
                  @click="onClickPrepareProduct(productKit.product_kit)"
                >
                  <span>создать</span>
                </v-btn>
              </v-card-actions>
            </ProductKitCard>
            <v-overlay
              color="white"
              :opacity="0.85"
              :value="prepareProduct"
              class="load-layout"
            >
              <v-card elevation="0" light class="storage-prepare-product-card">
                <v-card-text>приготовление продукта</v-card-text>
                <v-progress-circular
                  :rotate="360"
                  :size="100"
                  :width="15"
                  :value="prepareProductProgress"
                  color="deep-orange"
                >
                  {{ prepareProductTimeToFinal }} сек.
                </v-progress-circular>
              </v-card>
            </v-overlay>
          </div>
        </div>
      </v-tab-item>
      <v-tab-item>
        <div v-if="products.length == 0">
          <p>У вашей команды ещё нет продуктов</p>
        </div>
        <div v-else v-for="product in products" :key="product['$id']">
          <ProductCard
            :isProductKit="false"
            :nameProduct="product.product.name"
            :item="product.count"
            :modelItem="cards.product.model"
          >
          </ProductCard>
        </div>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
// TODO: улучшить дизайн карточки
// TODO: создание продукта из продуктового набора
// TODO: продажу продуктового набора клиенту
import {mapGetters} from 'vuex';

import ProductKitStorage from '@/store/models/ProductKitStorage';
import User from '@/store/models/User';

import ProductKit from '@/models/model.productKit';
import Product from '@/models/model.product';

import Load from '@/UI/Load.vue';
import ItemStoreCard from '@/UI/ItemStoreCard.vue';

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
        product: {
          model: new Product(),
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
    ...mapGetters({
      prepareProductProgress: 'storageTeam/GET_prepareProduct_PROGRESS',
      prepareProduct: 'storageTeam/GET_STATE_PREPARE_PRODUCT',
      prepareProductTimeToFinal: 'storageTeam/GET_prepareProduct_TIME',
    }),
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
      return this.$store.$db().model('productKits_storage').all();
    },
    products() {
      return this.$store.$db().model('products_storage').all();
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
      this.$store.commit('storageTeam/SET_PREPARE_PRODUCT');
      console.warn('STORAGE: onClickPrepareProduct');
      console.warn(productKit);
      const timeToPrepare = Number.parseInt(productKit.time);

      this.$store.dispatch('storageTeam/prepareProduct', timeToPrepare);
    },
    getProductName(productId) {
      console.warn('MODULE.STORAGE: getProductName');
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
    ProductKitCard: ItemStoreCard,
    ProductCard: ItemStoreCard,
  },
};
</script>

<style></style>
