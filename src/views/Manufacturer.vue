<template>
  <div class="manufacturer-layout">
    <div>Страница поставщика</div>

    <div class="manufacturer-actions">
      <v-btn
        class="manufacturer-btn-action ma-1"
        outlined
        color="#6c63ff"
        rounded
        v-for="tab in tabs.tabsAction"
        :key="tab.form"
        @click.prevent="onClickActionTab(tab.form, tab.label)"
        ><span class="manufacturer-action-text">{{ tab.label }}</span>
      </v-btn>
    </div>
    <!-- // INFO: Форма создания продукта  -->
    <Form
      :activate="forms.formAddProduct.active"
      :title="forms.titleForm"
      :model="forms.formAddProduct.model"
      :parentFunction="onClickCreateProduct"
      :cancelForm="onClickCancelForm"
      :load="STATE_createProduct"
    >
      <v-alert v-if="forms.formAddProduct.errors.length > 0">
        <v-card-text class="ma-0 pa-0">Возникли следующие ошибки:</v-card-text>
        <ul class="form-errors-container">
          <li
            class="form-error-message"
            v-for="error in forms.formAddProduct.errors"
            :key="error"
          >
            <v-card-text class="mt-1 pa-0 form-error-text">
              {{ error }}
            </v-card-text>
          </li>
        </ul>
      </v-alert>
    </Form>
    <!-- // INFO: Форма создания продуктового набора-->
    <Form
      :activate="forms.formAddProductKit.active"
      :title="forms.titleForm"
      :model="forms.formAddProductKit.model"
      :disableFields="forms.formAddProductKit.disableFields"
      :parentFunction="onClickApplyCreateProductKit"
      :cancelForm="onClickCancelForm"
      :load="STATE_createProductKit"
      :errorsMessage="forms.formAddProductKit.errors"
    >
    </Form>
    <div>
      <v-tabs
        center-active
        centered
        fixed-tabs
        color="#6c63ff"
        class="manufacturer-layout mt-2 panel-tabs"
      >
        <div class="panel-tabs container">
          <v-tab class="panel-tabs tabs"
            ><span class="panel-tabs text">продукты</span></v-tab
          >

          <v-tab class="panel-tabs tabs" @click="onClickTabProductKits">
            <span class="panel-tabs text">продуктовые наборы</span>
          </v-tab>
        </div>

        <!-- INFO: список готовых продуктов -->

        <v-tab-item class="mt-2 panel-tabs">
          <Load v-if="getListProducts" />
          <span v-else-if="arrays.products.length == 0">
            нет готовых продуктов
            {{ arrays.products }}
          </span>

          <div v-else class="products-cards">
            <ProductCard
              v-for="product in arrays.products"
              :key="product.id"
              :item="product"
              :title="{name: product.name}"
              :modelItem="modelsCard.product"
            >
              <v-card-actions class="manufacturer-card-action">
                <v-btn
                  v-if="dataCurrentUser.is_superuser"
                  class="mt-1 manufacturer-action-btn"
                  outlined
                  rounded
                  color="#ee5544"
                  @click.prevent="onClickDeleteProduct(product)"
                >
                  <span class="product-btn-action-text">удалить</span>
                </v-btn>
                <v-btn
                  class="mt-1 manufacturer-action-btn"
                  outlined
                  rounded
                  color="#ee5544"
                  @click.prevent="onClickCreateProductKit(product)"
                >
                  <span class="product-btn-action-text">cоздать комплект</span>
                </v-btn>
              </v-card-actions>
            </ProductCard>
          </div>
        </v-tab-item>
        <!-- // INFO: список готовых продуктовых наборов -->

        <v-tab-item class="mt-2">
          <Load v-if="render.content" />
          <div class="products-cards" v-if="arrays.products.length > 0">
            <ProductCard
              v-for="productKit in productKits.items"
              :key="productKit.id"
              :item="productKit"
              :title="{
                title: arrays.products.find(
                  (item) => item.id == productKit.product
                ).name,
              }"
              :modelItem="modelsCard.productKit"
              :showLabel="true"
            >
              <v-card-actions class="manufacturer-card-action pa-2">
                <slot></slot>
                <v-btn
                  class="mr-1 btn-put-to-sell"
                  outlined
                  rounded
                  color="#ee5544"
                  @click.prevent="onClickSellProductKit(productKit)"
                >
                  <span class="btn-put-to-sell-text">Продать</span>
                </v-btn>
              </v-card-actions>
            </ProductCard>
            <!-- // INFO: Form of sell ProductKit -->
            <Form
              :activate="forms.formSellProductKit.active"
              :title="forms.titleForm"
              :model="forms.formSellProductKit.model"
              :select="forms.formSellProductKit.select"
              :disableFields="forms.formSellProductKit.disableFields"
              :parentFunction="onClickApplySellProductKit"
              :cancelForm="onClickCancelForm"
              :load="$store.getters['offer/GET_offerSale']"
            >
              <v-select
                class="form-slot"
                :items="arrays.namesTeam"
                color="#6c63ff"
                item-color="#6c63ff"
                label="Продажа продукта команде:"
                :v-model="forms.formSellProductKit.model.data.toTeam"
              >
              </v-select>
            </Form>
          </div>
          <div v-else>
            <p>Заготовленные продуктовые наборы отсутствуют</p>
          </div>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
import ModelProduct from '@/models/model.product';
import ModelProductKit from '@/models/model.productKit';
import CreateProduct from '@/models/model.create.product';
import CreateProductKit from '@/models/model.productKit.create';
import CreateSellOffer from '@/models/model.productKit.sell';

import Form from '@/UI/Form.vue';
import ProductCard from '@/UI/ProductCard.vue';
// FIX: import DialogError from '@/UI/DialogError.vue';
import Load from '@/UI/Load.vue';
import {mapGetters} from 'vuex';

export default {
  components: {
    Load,

    Form,
    ProductCard,
  },
  data() {
    return {
      render: {
        content: false,
      },
      arrays: {
        products: [],
        productKits: [],
        namesTeam: [],
      },
      deleteState: {
        errors: [],
        data: {},
      },
      tabs: {
        tabsAction: this.$store.getters['products/GET_LIST_TABS_ACTION'],
        tabsView: this.$store.getters['products/GET_LIST_TABS_VIEW'],
      },

      modelsCard: {
        product: new ModelProduct(),
        productKit: new ModelProductKit(),
      },

      forms: {
        activeForm: '',
        titleForm: '',
        formAddProduct: {
          active: false,
          model: new CreateProduct(),
          validate: false,
          applySucces: false,
          errors: [],
        },
        formAddProductKit: {
          active: false,
          model: new CreateProductKit(),
          select: {},
          values: {},
          applySucces: false,
          disableFields: {}, // NOTE: {disable textField: boolean}
          errors: [],
        },
        formSellProduct: {
          active: false,
          model: null,
          validate: false,
          select: {},
          applySucces: false,
        },
        formSellProductKit: {
          active: false,
          model: new CreateSellOffer(),
          validate: false,
          select: {},
          applySucces: false,
          disableFields: {}, // NOTE: {disable textField: boolean}
        },
      },
    };
  },
  async created() {
    console.warn('MANUFACTURER.VUE: CREATED');

    const products = await this.$store.dispatch('products/getProducts');
    const productKits = await this.$store.dispatch('productKit/getProductKits');

    const teams = await this.$store.dispatch('team/getTeams');
    const namesTeam = teams.items.map((team) => team.name);
    // const teamNames = teams.map((item) => {
    //   return item.name;
    // });

    this.arrays.namesTeam = namesTeam;
    this.arrays.productKits = productKits.items;
    this.arrays.products = products.items;
  },
  computed: {
    ...mapGetters({
      isDeleteProductRun: 'products/GET_STATE_DELETE_PRODUCT_RUN',
      isDeleteProductError: 'products/GET_STATE_DELETE_PRODUCT_ERROR',
      getListProducts: 'products/GET_STATE_getListProducts',
      isProductsUpdate: 'products/GET_LIST_PRODUCTS_UPDATE',
      isErrorDeleteProductKit: 'productKit/GET_PRODUCT_KIT_DELETE_ERROR',
      isDeleteProductKitRun: 'productKit/GET_PRODUCT_KIT_DELETE_RUN',
      isGetProductKits: 'productKit/STATE_getProductKits',

      dataCurrentUser: 'user/GET_DATA_CURRENT_USER',
    }),
    stateProduct() {
      return this.$store.getters['stateShop/GET_STATE_PRODUCT'];
    },
    STATE_createProduct() {
      return this.$store.getters['products/GET_STATE_createProduct'];
    },
    STATE_createProductKit() {
      return this.$store.getters['productKits/GET_PRODUCT_KIT_CREATE'];
    },

    currentUser() {
      return this.$store.state.auth.user;
    },
    // products() {
    //   console.warn('MANUFACTURER.VUE: products');
    //   return this.$store.$db().model('products').query().get();
    // },
    productKits() {
      console.warn('MANUFACTURER.VUE: productKits');
      return this.arrays.productKits;
    },
    getProduct() {
      return (id) => {
        return this.$store
          .$db()
          .model('products')
          .query()
          .where('id', id)
          .first();
      };
    },
  },
  watch: {
    getListProduct(getProducts) {
      if (getProducts) {
        this.arrays.products = this.$db().model('products').all();
        this.$store.commit('products/SET_GET_LIST_PRODUCTS_COMPLETE');
      }
    },
  },
  methods: {
    // getProduct(productId) {
    //   let product = this.$store
    //     .$db()
    //     .model('products')
    //     .query()
    //     .where('id', productId)
    //     .first();
    //   return product;
    // },

    async onClickTabProductKits() {
      console.warn('MANUFACTURER.VUE: onClickTabProductKits');
      const listProductsKits = await this.$store.dispatch(
        'productKit/getProductKits'
      );

      this.arrays.productKits = listProductsKits;
    },
    onClickActionTab(form, title) {
      this.forms.activeForm = form;
      this.forms.titleForm = title;
      this.forms[form].active = true;
    },
    onClickCardActions(product) {
      console.warn('MANUFACTURER.VUE: onClickCardActions');
      console.error(product);
    },
    async onClickCreateProduct(createdProduct) {
      console.warn('MANUFACTURER.VUE: onClickCreateProduct');
      this.$store.commit('products/SET_PRODUCT_CREATE');
      this.forms.formAddProduct.errors = [];
      createdProduct.name = createdProduct.name.toLowerCase();

      console.log(createdProduct);
      const productsWithCurrentName = this.$store
        .$db()
        .model('products')
        .query()
        .where('name', createdProduct.name)
        .get();
      if (productsWithCurrentName.length == 0) {
        await this.$store.dispatch('products/createProduct', createdProduct);
      } else {
        // FIX:перенести в словарь с сообщениями
        const message =
          'Продукт с названием "' + createdProduct.name + '" уже существует';
        this.forms.formAddProduct.errors.push(message);
      }
      this.$store.commit('products/SET_PRODUCT_CREATED');
      this.$store.commit('products/SET_LIST_PRODUCT_UPDATE_RUN');
    },
    onClickCreateProductKit(product) {
      console.warn('MANUFACTURER.VUE: onClickCreateProductKit');
      this.forms.activeForm = 'formAddProductKit';
      this.forms.titleForm = 'Создать продуктовый набор';
      this.forms.formAddProductKit.model.data['product_id'] = product.id;
      this.forms.formAddProductKit.disableFields['product_id'] = true;
      this.forms.formAddProductKit.active = true;
    },
    async onClickApplyCreateProductKit(productKit) {
      console.warn('MANUFACTURER.vue: onClickApplyCreateProduct');
      this.forms.formAddProductKit.errors = [];
      console.error(productKit);

      const productKitIsExists = this.$store
        .$db()
        .model('productKits')
        .query()
        .where('product', productKit.product_id)
        .where('count', productKit.count)
        .where('time', productKit.time)
        .exists();
      if (productKitIsExists) {
        this.forms.formAddProductKit.errors.push(
          'Такой продуктовый набор уже существует'
        );
      } else {
        await this.$store.dispatch('productKit/createProductKit', productKit);
      }
      this.$store.commit('productKit/SET_CREATE_PRODUCT_KIT_COMPLETE');
    },
    onClickDeleteProduct(product) {
      this.$store.commit('products/SET_DELETE_PRODUCT_RUN');
      this.deleteState.data = product;
    },
    onClickCancelDeleteProduct() {
      this.deleteState.data = {};
    },
    async onClicApplykDeleteProduct() {
      console.warn('MANUFACTURER.VUE: onClickDeleteProduct');
      this.$store.commit('products/SET_DELETE_PRODUCT');
      const product = this.deleteState.data;
      console.warn(product);

      try {
        this.$store.$db().model('products').delete(product.id);
        const response = await this.$store.dispatch(
          'products/deleteProduct',
          product.id
        );
        await this.onClickTabProductKits();
        await this.$store.dispatch('products/getProducts');

        console.warn(response);
        this.onClickCancelDeleteProduct();
      } catch (error) {
        console.warn(error);
        this.$store.commit('products/SET_DELETE_PRODUCT_ERROR');
        this.deleteState.errors.push(error);
      }
    },
    async onClickDeleteProductKit(productKit) {
      const productId = Number.parseInt(productKit.product);
      this.$store.commit('productKit/SET_PRODUCT_KIT_DELETE_RUN');
      try {
        const response = await this.$store.dispatch(
          'productKit/delProductKit',
          productId
        );
        console.warn(response);
      } catch (error) {
        console.warn(error);

        this.$store.commit('productKit/SET_PRODUCT_KIT_DELETE_ERROR');
      }
    },
    onClickSellProductKit(productKit) {
      console.warn('MANUFACTURER.VUE: onClickSellProductKit');
      console.warn(productKit);
      this.forms.activeForm = 'formSellProductKit';
      this.forms.titleForm = 'выставить на продажу';
      this.forms.formSellProductKit.disableFields['product_kit_id'] = true;
      this.forms.formSellProductKit.model.data['product_kit_id'] =
        productKit.id;
      this.forms.formSellProductKit.active = true;
    },
    async onClickApplySellProductKit(saleOfferProductKit) {
      console.warn('MANUFACTURER: onClickApplySellProductKit');
      console.log(this.forms.formSellProductKit.model.data);
      // console.log(saleOfferProductKit);
      // const nameTeam = saleOfferProductKit.toTeam;
      // const team = this.$store
      //   .$db()
      //   .model('teams')
      //   .query()
      //   .where('name', nameTeam)
      //   .first();
      // console.log(team);
      // const accountTeam = team.account;
      // console.log(`id's account of team: ${accountTeam}`);

      // const offerSalePlace = await this.$store.dispatch(
      //   'offer/offerSalePlace',
      //   {
      //     price: saleOfferProductKit.price,
      //     product_kit_id: saleOfferProductKit.product_kit_id,
      //   }
      // );
      // console.log(offerSalePlace);
      // const offerId = offerSalePlace.id;
      // const offerSaleAcquire = await this.$store.dispatch(
      //   'offer/offerSaleAcquire',
      //   offerId
      // );
      // console.log(offerSaleAcquire);

      this.$store.commit('offer/SET_offerSale');
      console.warn(saleOfferProductKit);
      saleOfferProductKit.price = Number.parseInt(saleOfferProductKit.price);
      console.error(saleOfferProductKit);

      const offer = await this.$store.dispatch(
        'offer/offerSalePlace',
        saleOfferProductKit
      );
      console.error(offer);
    },
    onClickCancelForm() {
      console.warn('MANUFACTURER.VUE: onClickCancelForm');
      const activeForm = this.forms.activeForm;
      console.error(activeForm);
      this.forms[activeForm].active = false;
    },
  },
};
</script>
