<template>
  <div>
    <Load v-if="load.main" />
    <div v-else class="productKit-store-page">
      <v-tabs
        class="panels-tabs"
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
          <div class="" v-else-if="productKits.length == 0">
            <Empty title="Склад с продуктовыми наборами пуст" />
          </div>

          <div class="storage-content" v-else>
            <div
              v-for="(productKit, id) in productKits"
              :key="`${id}${productKit.time}${productKit.product}${productKit.id}`"
            >
              <ProductKitCard
                :nameProduct="dicts.products[productKit.product]"
                :modelItem="cards.productKit.model"
                :item="productKit"
              >
                <v-card-actions
                  class="store-product-kit-card-actions ma-0 pa-0"
                >
                  <v-btn
                    class="ma-0 pa-0 store-product-card-btn"
                    color="deep-orange"
                    text
                    @click="onClickPrepareProduct(productKit)"
                  >
                    <span>создать продукт</span>
                  </v-btn>
                </v-card-actions>
              </ProductKitCard>

              <v-overlay
                color="white"
                :opacity="0.85"
                :value="prepareProduct"
                class="load-layout"
              >
                <v-card
                  elevation="0"
                  light
                  class="storage-prepare-product-card"
                >
                  <v-card-text>приготовление продукта</v-card-text>
                  <v-progress-circular
                    :rotate="360"
                    :size="100"
                    :width="15"
                    :value="prepareProductProgress"
                    color="deep-orange"
                  >
                    <!-- {{ prepareProductTimeToFinal }} сек. -->
                    {{ Math.round(prepareProductProgress) }}%
                  </v-progress-circular>
                </v-card>
              </v-overlay>
            </div>
          </div>
        </v-tab-item>
        <!-- // INFO: Вкладка с продуктами -->
        <v-tab-item
          :class="
            teamProducts.length == 0
              ? 'flex-column justify-center'
              : 'storage-content'
          "
        >
          <Load v-if="load.teamProducts"></Load>
          <div v-else-if="teamProducts.length == 0">
            <Empty title="Склад с продуктами пуст" />
          </div>

          <div v-else v-for="product in teamProducts" :key="product.id">
            <ProductCard
              :isProductKit="false"
              :nameProduct="product.product_name"
              :item="product"
              :countItems="product.count"
              :modelItem="cards.product.model"
            >
              <v-btn
                text
                large
                color="deep-orange"
                @click="onClickSellProduct(product)"
              >
                Продать
              </v-btn>
            </ProductCard>
          </div>
          <Form
            :title="form.title"
            :activate="form.sellProduct.active"
            v-if="form.sellProduct.active"
            :model="form.sellProduct.model"
            :load="form.isLoad"
            :parentFunction="onClickApplySellProduct"
            :cancelForm="onClickCancelForm"
            :disableFields="form.sellProduct.model.hideShow"
            :select="{to_customer: Object.keys(dicts.customers)}"
            :errorsMessage="form.errors"
            :applySuccess="form.success"
          >
          </Form>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

import User from '@/store/models/User';
// import OfferPurchasePlace from '@/models/model.offer.purchase.place';

import ProductKit from '@/models/model.productKit';
import Product from '@/models/model.product';
import CreateProductSell from '@/models/model.product.sell';

import Load from '@/UI/Load.vue';
import ItemStoreCard from '@/UI/ItemStoreCard.vue';
import Form from '@/UI/Form.vue';
import Empty from '@/UI/Empty.vue';

export default {
  components: {
    Empty,
    Load,
    ProductKitCard: ItemStoreCard,
    ProductCard: ItemStoreCard,
    Form,
  },
  data() {
    return {
      load: {
        main: false,
        teamProducts: false,
      },
      prepareProductKit: {
        timer: 0,
        progress: 0,
        productKit_id: null,
      },
      form: {
        currentActive: '',
        title: '',
        isLoad: false,
        success: false,
        errors: [],
        currentData: null,
        sellProduct: {active: false, model: CreateProductSell},
      },
      arrays: {productKits: [], teamProducts: [], customerNames: []},
      error: {
        arraysCustomerNames: false,
      },
      dicts: {products: {}, customers: {}}, // INFO: {productId:Name}
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
    this.load.main = true;
    const answer = await this.$store.dispatch('user/getCustomerNames');
    let customers = null;
    if (answer.status === 200) {
      customers = answer.data;
      customers.forEach((customer) => {
        this.dicts.customers[customer.username] = customer.id;
      });
    } else {
      this.errors.arraysCustomerNames = true;
    }

    const username = this.$store.state.auth.user.username;
    const userData = (await User.api().getUserByUsername(username)).response
      .data;
    console.error('CREATED: USER DATA\n', userData);
    const team_id = userData.team;
    console.error(team_id);
    const products = await this.$store.dispatch('products/getProducts');
    let dictsProducts = {};
    console.error('PRODUCTS');
    console.log(products);
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
    this.arrays.productKits = productKits;

    productKits.forEach((pk) => console.log(pk)); // pk.product_kit.product
    this.$store.commit('storageTeam/SET_GET_PRODUCTS_KIT_TEAM_RUN_COMPLETE');
    this.load.main = false;
  },
  computed: {
    ...mapGetters({
      prepareProductProgress: 'storageTeam/GET_prepareProduct_PROGRESS',
      prepareProduct: 'storageTeam/GET_STATE_PREPARE_PRODUCT',
      prepareProductTimeToFinal: 'storageTeam/GET_prepareProduct_TIME',
      isGetProductKits: 'storageTeam/GET_STATE_TEAM_PRODUCTS_KIT_RUN',
      dataCurrentUser: 'user/GET_CURRENT_USER_DATA',
      offerPurchaseComplete: 'offer/GET_OFFER_ACQUIRE_COMPLETE',
      offerPurchaseInProgress: 'offer/GET_STATE_OFFER_PREPARE',
    }),
    currentUserData() {
      return this.$store.state.user.currentUserData;
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
      console.error('PREPARE PRODUCT: ' + value);
      if (!value) {
        const teamId = this.dataCurrentUser.team;

        this.arrays.productKits = await this.$store.dispatch(
          'storageTeam/getTeamProductKits',
          teamId
        );
        this.load.teamProducts = true;
        const products = await this.$store.dispatch(
          'storageTeam/getTeamProducts',
          teamId
        );
        this.arrays.teamProducts = products;
        this.load.teamProducts = false;
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

      const timeToPrepare = Number.parseInt(productKit.time);
      this.prepareProductKit.productKit_id = productKit.id;
      const teamId = this.dataCurrentUser.team;
      const productKit_id = this.prepareProductKit.productKit_id;
      this.$store.dispatch('storageTeam/checkCreatedProductKits', {
        teamId: teamId,
        productKitId: productKit_id,
      });
      await this.$store.dispatch('storageTeam/prepareProduct', timeToPrepare);
    },

    onClickCancelForm() {
      console.warn('STORAGE: onClickCancelForm');
      const activeForm = this.form.currentActive;
      this.form[activeForm].active = false;
      this.form.currentData = null;
      this.form.title = '';
      this.form.errors = [];
      this.form.isLoad = false;
    },
    onClickSellProduct(product) {
      console.warn('STORAGE: onClickSellProduct');
      console.log(product);
      this.form.currentData = product;
      this.form.currentActive = 'sellProduct';
      this.form.title = `Продажа продукта "${product.product_name}"`;
      this.form.sellProduct.active = true;
    },
    async onClickApplySellProduct(modelOfferProductSell) {
      console.warn('STORAGE: onClickApplySellProduct');
      console.log(modelOfferProductSell);
      this.form.errors = [];
      this.form.success = false;
      if (modelOfferProductSell.count <= this.form.currentData.count) {
        this.form.isLoad = true;
        // const product_id = this.form.currentData.product.id;

        const product_id = this.form.currentData.product;

        const customer_id =
          this.dicts.customers[modelOfferProductSell.to_customer];
        modelOfferProductSell.product = product_id;
        modelOfferProductSell.to_customer = customer_id;

        const responsePlace = await this.$store.dispatch(
          'offer/createOfferPurchase',
          modelOfferProductSell
        );
        console.log('RESPONSE OFFER PURCHASE PLACE\n', responsePlace);
        if (responsePlace.status === 200) {
          console.log(responsePlace.data);
          const offer = responsePlace.data;

          const responseAcquire = await this.$store.dispatch(
            'offer/offerPurchaseAcquire',
            {offerId: offer.id, customerId: customer_id}
          );
          if (responseAcquire.status === 200) {
            const teamId = this.currentUserData.team;
            this.load.teamProducts = true;
            await this.$store.dispatch('team/updateTeamBalance', teamId);
            await this.updateNamesProducts();
            await this.updateItemsProducts(teamId);
            this.load.teamProducts = false;
          } else {
            this.form.errors.push('Произошла ошибка во время продажи');
            this.form.isLoad = false;
          }
          this.form.isLoad = false;
          this.form.success = true;
        } else {
          this.form.errors.push('Произошла ошибка во время продажи');
          this.form.isLoad = false;
          return;
        }
      } else {
        this.form.errors.push('Недостаточно продуктов для продажи');
      }
      this.form.success = true;
    },
    async updateNamesProducts() {
      console.log('updateNameProducts');
      const products = await this.$store.dispatch('products/getProducts');
      let dictsProducts = {};
      products.forEach((product) => (dictsProducts[product.id] = product.name));
      this.dicts.products = dictsProducts;

      console.log('DICTS_PRODUCTS:\n', dictsProducts);
      console.log('PRODUCTS:\n', products);
    },
    async updateItemsProducts(teamId) {
      console.log('updateItemsProducts');
      this.$store.commit('storageTeam/SET_GET_PRODUCTS_KIT_TEAM_RUN');
      const teamProducts = await this.$store.dispatch(
        'storageTeam/getTeamProducts',
        teamId
      );

      const productKits = await this.$store.dispatch(
        'storageTeam/getTeamProductKits',
        teamId
      );

      this.arrays.productKits = productKits.filter(
        (pk) => this.dicts.products[pk.product]
      );
      console.log(productKits);
      productKits.forEach((pk) => console.log(pk));
      this.arrays.teamProducts = teamProducts;
      // pk.product_kit.product
      this.$store.commit('storageTeam/SET_GET_PRODUCTS_KIT_TEAM_RUN_COMPLETE');
      console.log('TEAM_PRODUCTS:\n', teamProducts);
    },
  },
};
</script>
