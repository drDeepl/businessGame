<template>
  <div class="productKit-store-page">
    <v-tabs color="#6C63FF">
      <v-tab>продуктовые наборы</v-tab>
      <v-tab>продукты</v-tab>
      <v-tab-item>
        <!-- NOTE: данные пользователя {{ currentUserData }} -->
        <Load v-if="isGetProductKits" />
        <p v-else-if="productKits.length == 0">
          в вашей команде ещё нет комплектов продуктов
        </p>
        <div v-else>
          {{ productKits[0] }}
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
          <!-- TODO: UI продуктовой карточки -->
          {{ product }}
          <ProductCard
            :isProductKit="false"
            :nameProduct="product.product.name"
            :item="product"
            :countItems="product.count"
            :modelItem="cards.product.model"
          >
            <v-btn
              class="ma-0 pa-0 store-product-card-btn"
              color="deep-orange"
              text
              ><span>продать</span></v-btn
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

// import ProductKitStorage from '@/store/models/ProductKitStorage';
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
      arrays: {productKits: [], products: []},
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
    this.$store.commit('storageTeam/SET_GET_PRODUCTS_KIT_TEAM_RUN');
    this.arrays.productKits = await this.$store.dispatch(
      'storageTeam/getTeamProductKits',
      team_id
    );
    this.arrays.products = await this.$store.dispatch(
      'storageTeam/getTeamProducts',
      team_id
    );

    this.$store.commit('storageTeam/SET_GET_PRODUCTS_KIT_TEAM_RUN_COMPLETE');
  },
  computed: {
    ...mapGetters({
      prepareProductProgress: 'storageTeam/GET_prepareProduct_PROGRESS',
      prepareProduct: 'storageTeam/GET_STATE_PREPARE_PRODUCT',
      prepareProductTimeToFinal: 'storageTeam/GET_prepareProduct_TIME',
      isGetProductKits: 'storageTeam/GET_STATE_TEAM_PRODUCTS_KIT_RUN',
      dataCurrentUser: 'user/GET_DATA_CURRENT_USER',
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
      // TODO: show arryas through variable

      return this.arrays.productKits;
    },
    products() {
      // TODO: show arryas through variable
      return this.arrays.products;
      // return this.$store.$db().model('products_storage').all();
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
  watch: {
    async prepareProduct(value) {
      // FIX проверить на баги
      console.error('PREPARE PRODUCT: ' + value);
      if (!value) {
        let teamId = this.dataCurrentUser.team;
        this.arrays.productKits = await this.$store.dispatch(
          'storageTeam/getTeamProductKits',
          teamId
        );
        const products = await this.$store.dispatch(
          'storageTeam/getTeamProducts',
          teamId
        );
        console.error(products);
      }
    },
  },
  methods: {
    async plusProgress(count) {
      this.prepareProductKit.progress = this.prepareProductKit.progress + count;
      console.error(this.prepareProductKit.progress);
    },
    async onClickPrepareProduct(productKit) {
      this.$store.commit('storageTeam/SET_PREPARE_PRODUCT');
      console.warn('STORAGE: onClickPrepareProduct');
      console.warn(productKit);
      const timeToPrepare = Number.parseInt(productKit.time);

      await this.$store.dispatch('storageTeam/prepareProduct', timeToPrepare);
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
