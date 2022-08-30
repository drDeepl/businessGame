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
    <!-- INFO: Форма создания продукта  -->
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
    <!-- INFO: Форма создания продуктового набора-->
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
      <v-tabs color="#6c63ff" class="manufacturer-layout mt-2">
        <v-tab color="#6c63ff" v-for="tab in tabs.tabsView" :key="tab.view">
          {{ tab.label }}
        </v-tab>
        <!-- INFO: список готовых продуктов -->
        <v-tab-item class="mt-2">
          <Load v-if="getListProducts" />
          <p v-else-if="products.length == 0">нет готовых продуктов</p>
          <div v-else class="products-cards">
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :item="product"
              :title="{name: product.name}"
              :modelItem="modelsCard.product"
            >
              <v-card-actions class="manufacturer-card-action">
                <v-btn
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
              <DialogError
                :active="deleteState.run"
                :title="'Вы уверены, что хотите удалить продукт?'"
              >
                <p
                  class="text-md-center"
                  v-if="deleteState.data.hasOwnProperty('name')"
                >
                  "{{ deleteState.data.name }}"
                </p>
                <v-card-actions>
                  <v-btn
                    color="grey"
                    rounded
                    outlined
                    @click="onClickCancelDeleteProduct"
                  >
                    <span>Отмена</span>
                  </v-btn>
                  <v-btn
                    :loading="isDeleteProduct"
                    color="red"
                    rounded
                    outlined
                    @click="onClicApplykDeleteProduct"
                  >
                    <span>Да, удалить продукт</span>
                  </v-btn>
                </v-card-actions>
              </DialogError>
              <DialogError
                :active="deleteState.errors.length > 0"
                :title="'При удалении продукта возникли ошибки:'"
              >
                <p v-for="i in Object.keys(deleteState.errors)" :key="i">
                  {{ deleteState.errors[i] }}
                </p>
              </DialogError>
            </ProductCard>
          </div>
        </v-tab-item>
        <!-- INFO: список готовых продуктовых наборов -->
        <v-tab-item class="mt-2">
          <div class="products-cards">
            <ProductCard
              v-for="productKit in productKits"
              :key="productKit.id"
              :item="productKit"
              :title="{product: getProduct(productKit.product).name}"
              :modelItem="modelsCard.productKit"
              :showLabel="true"
            >
              <v-card-actions class="manufacturer-card-action pa-2">
                <!-- <v-btn
                  class="mb-1"
                  outlined
                  rounded
                  color="#ee5544"
                  :loading="isDeleteProductKitRun"
                  @click.prevent="onClickDeleteProductKit(productKit)"
                >
                  <span>удалить</span>
                </v-btn> -->
                <slot></slot>
                <v-btn
                  class="mr-1 btn-put-to-sell"
                  outlined
                  rounded
                  color="#ee5544"
                  @click.prevent="onClickSellProductKit(productKit)"
                >
                  <span class="btn-put-to-sell-text">выставить на продажу</span>
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
            </Form>
            <!-- <DialogError
              :active="isErrorDeleteProductKit"
              title="при удалении комплекта произошла ошибка"
            >
              <v-btn
                color="deep-orange"
                text
                @click="onClickCloseDeleteProductKitError"
                >закрыть</v-btn
              >
            </DialogError> -->
          </div>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
// TODO: [13.07.22]: продажу продуктовых наборов
// TODO: [15.07.2022] Упростить подмену product_id на product_name
// TODO: [18.07.2022] научиться в общем виде делать подмену данных формы через watch
// TODO: [26.07.2022] Синхронизировать данные между компонентами
import ModelProduct from '@/models/model.product';
import ModelProductKit from '@/models/model.productKit';
import CreateProduct from '@/models/model.create.product';
import CreateProductKit from '@/models/model.productKit.create';
import CreateSellOffer from '@/models/model.productKit.sell';

import Form from '@/UI/Form.vue';
import ProductCard from '@/UI/ProductCard.vue';
import DialogError from '@/UI/DialogError.vue';
import Load from '@/UI/Load.vue';
import {mapGetters} from 'vuex';

export default {
  components: {
    Load,
    DialogError,
    Form,
    ProductCard,
  },
  data() {
    return {
      arrays: {
        products: [],
      },
      deleteState: {
        run: false,
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
    console.error(products);
    this.arrays.products = products;
  },
  computed: {
    ...mapGetters({
      isDeleteProduct: 'products/GET_STATE_DELETE_PRODUCT',
      getListProducts: 'products/GET_STATE_getListProducts',
      isProductsUpdate: 'products/GET_LIST_PRODUCTS_UPDATE',
      isErrorDeleteProductKit: 'productKit/GET_PRODUCT_KIT_DELETE_ERROR',
      isDeleteProductKitRun: 'productKit/GET_PRODUCT_KIT_DELETE_RUN',
    }),
    stateProduct() {
      return this.$store.getters['stateShop/GET_STATE_PRODUCT'];
    },
    STATE_createProduct() {
      return this.$store.getters['products/GET_STATE_createProduct'];
      // return this.$store.state.products.createProduct;
    },
    STATE_createProductKit() {
      return this.$store.getters['productKits/GET_PRODUCT_KIT_CREATE'];
    },

    currentUser() {
      return this.$store.state.auth.user;
    },
    products() {
      console.warn('MANUFACTURER.VUE: products');
      return this.$store.$db().model('products').query().get();
    },
    productKits() {
      console.warn('MANUFACTURER.VUE: productKits');
      let listProductKits = this.$store
        .$db()
        .model('productKits')
        .query()
        .get();
      return listProductKits;
    },
    getProduct() {
      return (id) =>
        this.$store.$db().model('products').query().where('id', id).first();
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
      this.deleteState.data = product;
      this.deleteState.run = true;
    },
    onClickCancelDeleteProduct() {
      this.deleteState.run = false;
      this.deleteState.data = {};
    },
    async onClicApplykDeleteProduct() {
      console.warn('MANUFACTURER.VUE: onClickDeleteProduct');
      this.$store.commit('products/SET_DELETE_PRODUCT');
      const product = this.deleteState.data;
      console.warn(product);

      try {
        const response = await this.$store.dispatch(
          'products/deleteProduct',
          product.id
        );
        this.onClickCancelDeleteProduct();
        await this.$store.dispatch('products/getProducts');

        console.warn(response);
      } catch (error) {
        console.warn(error);
        this.deleteState.errors.push(error);
      }
    },
    // async onClickDeleteProductKit(productKit) {
    //   const productId = Number.parseInt(productKit.product);
    //   this.$store.commit('productKit/SET_PRODUCT_KIT_DELETE_RUN');
    //   try {
    //     const response = await this.$store.dispatch(
    //       'productKit/delProductKit',
    //       productId
    //     );
    //     console.warn(response);
    //   } catch (error) {
    //     console.warn(error);

    //     this.$store.commit('productKit/SET_PRODUCT_KIT_DELETE_ERROR');
    //   }
    // },
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
    //   onClickCloseDeleteProductKitError() {
    //     this.$store.commit('productKit/SET_PRODUCT_KIT_DELETE_ERROR_COMPLETE');
    //     this.$store.commit('productKit/SET_PRODUCT_KIT_DELETE_RUN_COMPLETE');
    //   },
  },
};
</script>
