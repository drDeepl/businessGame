<template>
  <div class="productKit-store-page">
    <v-tabs
      class="panel-tabs"
      center-active
      centered
      fixed-tabs
      color="#6C63FF"
    >
      <div class="panel-tabs container">
        <v-tab class="panel-tabs tabs">
          <span class="panel-tabs text">продуктовые наборы</span>
        </v-tab>
        <v-tab class="panel-tabs tabs">
          <span class="panel-tabs text">продукты</span>
        </v-tab>
      </div>

      <v-tab-item>
        <Load v-if="isGetProductKits" />
        <div v-else-if="productKits.length == 0">
          У Вашей команды ещё нет продуктовых наборов
        </div>

        <div v-else>
          <div v-for="productKit in productKits" :key="productKit.id">
            <ProductKitCard
              :nameProduct="dicts.products[productKit.product_kit.product]"
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
        <div v-if="teamProducts.length == 0">
          <p>У вашей команды ещё нет продуктов</p>
        </div>
        <div v-else v-for="product in products" :key="product['$id']">
          <ProductCard
            :isProductKit="false"
            :nameProduct="product.product.name"
            :item="product"
            :countItems="product.count"
            :modelItem="cards.product.model"
          >
          </ProductCard>

          <!-- // FIX: Исправить или удалить -->
          <Form
            v-if="false"
            :activate="false"
            :title="
              'Продажа ' +
              ' \'\'' +
              product.product.name +
              '\'\' ' +
              product.count +
              ' шт.'
            "
            :model="forms.createOfferProduct.model"
            :applySucces="offerPurchaseComplete"
            :parenFunction="onClickSellProduct"
            :load="offerPurchaseInProgress"
            :cancelForm="() => (forms.createOfferProduct.active = false)"
            :parentFunction="onClickSellProduct"
          >
            <!-- // FIX: Удалить -->
          </Form>
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

import User from '@/store/models/User';
// import OfferPurchasePlace from '@/models/model.offer.purchase.place';

import ProductKit from '@/models/model.productKit';
import Product from '@/models/model.product';

import Load from '@/UI/Load.vue';
import ItemStoreCard from '@/UI/ItemStoreCard.vue';
import Form from '@/UI/Form.vue';

export default {
  data() {
    return {
      prepareProductKit: {
        timer: 0,
        progress: 0,
      },
      arrays: {productKits: [], teamProducts: []},
      dicts: {products: {}}, // INFO: {productId:Name}
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
    const products = await this.$store.dispatch('products/getProducts');
    let dictsProducts = {};
    products.forEach((product) => (dictsProducts[product.id] = product.name));
    console.log('DICGTS_PRODUCTS:\n', dictsProducts);
    console.log('PRODUCTS:\n', products);
    this.$store.commit('storageTeam/SET_GET_PRODUCTS_KIT_TEAM_RUN');
    const teamProducts = await this.$store.dispatch(
      'storageTeam/getTeamProducts',
      team_id
    );
    this.dicts.products = dictsProducts;
    this.arrays.teamProducts = teamProducts;
    console.log('TEAM_PRODUCTS:\n', teamProducts);

    const productKits = await this.$store.dispatch(
      'storageTeam/getTeamProductKits',
      team_id
    );
    this.arrays.productKits = productKits.filter(
      (pk) => this.dicts.products[pk.product_kit.product]
    );
    console.log(productKits);
    productKits.forEach((pk) => console.log(pk)); // pk.product_kit.product
    this.$store.commit('storageTeam/SET_GET_PRODUCTS_KIT_TEAM_RUN_COMPLETE');
  },
  computed: {
    ...mapGetters({
      prepareProductProgress: 'storageTeam/GET_prepareProduct_PROGRESS',
      prepareProduct: 'storageTeam/GET_STATE_PREPARE_PRODUCT',
      prepareProductTimeToFinal: 'storageTeam/GET_prepareProduct_TIME',
      isGetProductKits: 'storageTeam/GET_STATE_TEAM_PRODUCTS_KIT_RUN',
      dataCurrentUser: 'user/GET_DATA_CURRENT_USER',
      offerPurchaseComplete: 'offer/GET_OFFER_ACQUIRE_COMPLETE',
      offerPurchaseInProgress: 'offer/GET_STATE_OFFER_PREPARE',
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
      return this.arrays.productKits;
    },
    teamProducts() {
      return this.arrays.teamProducts;
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
      // FIX: rewrite preapreProduct + checkCreated
      console.error('PREPARE PRODUCT: ' + value);
      if (!value) {
        let teamId = this.dataCurrentUser.team;
        await this.$store.dispatch(
          'storageTeam/checkCreatedProductKits',
          teamId
        );
        this.arrays.productKits = await this.$store.dispatch(
          'storageTeam/getTeamProductKits',
          teamId
        );

        const products = await this.$store.dispatch(
          'storageTeam/getTeamProducts',
          teamId
        );
        this.arrays.teamProducts = products;
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
      const nameProduct = product.name ? product.name : '';
      return nameProduct;
    },
  },

  components: {
    Load,
    ProductKitCard: ItemStoreCard,
    ProductCard: ItemStoreCard,
    Form,
  },
};
</script>

<style></style>
