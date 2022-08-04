<template>
  <div class="manufacturer-layout">
    <div>Страница поставщика</div>
    {{ productKits[0] }}
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
      :load="createProduct"
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
    >
    </Form>
    <div>
      <v-tabs color="#6c63ff" class="manufacturer-layout mt-2">
        <v-tab color="#6c63ff" v-for="tab in tabs.tabsView" :key="tab.view">
          {{ tab.label }}
        </v-tab>
        <!-- INFO: список готовых продуктов -->
        <v-tab-item class="mt-2">
          <div class="products-cards">
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
            </ProductCard>
            <!-- NOTE: id - мнимая часть этой карточки <span>{{ product.id }}</span> -->
          </div>
        </v-tab-item>
        <!-- INFO: список готовых продуктовых наборов -->
        <v-tab-item class="mt-2">
          <div class="products-cards">
            <ProductCard
              v-for="productKit in productKits"
              :key="productKit.id"
              :item="productKit"
              :title="{product: productKit.product_data.name}"
              :modelItem="modelsCard.productKit"
              :showLabel="true"
            >
              <v-card-actions class="manufacturer-card-action ma-2 pa-2">
                <v-btn
                  class="mb-1"
                  outlined
                  rounded
                  color="#ee5544"
                  @click.prevent="onClickSellProductKit(productKit)"
                >
                  <span>продать</span>
                </v-btn>
                <v-btn
                  class="mb-1"
                  outlined
                  rounded
                  color="#ee5544"
                  @click.prevent="onClickDeleteProductKit(productKit)"
                >
                  <span>удалить</span>
                </v-btn>
              </v-card-actions>
            </ProductCard>
            <Form
              :activate="forms.formSellProductKit.active"
              :title="forms.titleForm"
              :model="forms.formSellProductKit.model"
              :select="forms.formSellProductKit.select"
              :disableFields="forms.formSellProductKit.disableFields"
              :parentFunction="onClickApplySellProductKit"
              :cancelForm="onClickCancelForm"
            >
            </Form>
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
import Product from '@/store/models/Product';
import ProductKit from '@/store/models/ProductKit';
import Offer from '@/store/models/Offer';
export default {
  async created() {
    console.warn('MANUFACTURER.VUE: CREATED');
    // const jwt = this.$store.state.auth.user.access;
    // await Product.api().getListProducts(jwt);
    // await ProductKit.api().getListProductKits(jwt);
    // this.arrays.products = this.$store.$db().model('products').all();
    // this.arrays.productKits = this.$store.$db().model('productKits').all();
    // console.error(listProducts.response.data);
    // console.error('listProductKits:\n', listProductKits.response.data);
    // NOTE: Что, если добавить хэлпер, которые заменит в наборе
    // NOTE: product_id на product_name
    // FIX: Ошибка при изменении колонки в ProductKit product_id
    // FIX: на product
    // this.arrays.products = listProducts.response.data;
    // TODO: [15.07.2022] упростить функцию ниже
    // const productKits = listProductKits.response.data;
    // for (let key in productKits) {
    //   const productKit = productKits[key];
    //   const product = Product.query().where('id', productKit.product).get();
    //   const productName = product[0].name;
    //   productKit.product = productName;
    // }
    // this.arrays.productKits = listProductKits.response.data;
  },
  data() {
    return {
      test: '',
      tabs: {
        tabsAction: this.$store.getters['products/GET_LIST_TABS_ACTION'],
        tabsView: this.$store.getters['products/GET_LIST_TABS_VIEW'],
      },
      // arrays: {
      //   products: null,
      //   productKits: null,
      // },
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
  computed: {
    stateProduct() {
      return this.$store.getters['stateShop/GET_STATE_PRODUCT'];
    },
    createProduct() {
      return this.$store.getters['products/GET_STATE_createProduct'];
      // return this.$store.state.products.createProduct;
    },
    getJWT() {
      return this.$store.state.auth.user.access;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
    products() {
      console.warn('MANUFACTURER.VUE: products');
      return this.$store.$db().model('products').all();
    },
    productKits() {
      console.warn('MANUFACTURER.VUE: productKits');
      const productKits = this.$store
        .$db()
        .model('productKits')
        .query()
        .with('product_data')
        .get();
      return productKits;
    },
    getProductNameById() {
      return (id) =>
        this.$store
          .$db()
          .model('products')
          .query()
          .where('id', id)
          .get()
          .first().name;
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
      console.error(productKit);

      await this.$store.dispatch('productKit/socket_getListProdKit');
      this.arrays.productKits = ProductKit.all();
    },
    async onClickDeleteProduct(product) {
      // FIX: Ошибка 500 при удалении продукта
      console.warn('MANUFACTURER.VUE: onClickDeleteProduct', product);
      await Product.api().deleteProduct(product.id, this.getJWT);
    },
    onClickDeleteProductKit(productKit) {
      console.warn(productKit);
    },
    onClickSellProductKit(productKit) {
      console.warn('MANUFACTURER.VUE: onClickSellProductKit');
      console.warn(productKit);
      this.forms.activeForm = 'formSellProductKit';
      this.forms.titleForm = 'Продать продуктовый набор';
      this.forms.formSellProductKit.disableFields['product_kit_id'] = true;
      this.forms.formSellProductKit.model.data['product_kit_id'] =
        productKit.id;

      this.forms.formSellProductKit.active = true;
    },
    async onClickApplySellProductKit(saleOfferProductKit) {
      console.warn('MANUFACTURER: onClickApplySellProductKit');
      // TODO [18.07.2022]: осуществление продажи продуктового набора
      console.warn(saleOfferProductKit);
      saleOfferProductKit.price = Number.parseInt(saleOfferProductKit.price);
      console.error(saleOfferProductKit);
      const offer = await Offer.api().offerSalePlace(
        saleOfferProductKit,
        this.getJWT
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
  components: {
    Form,
    ProductCard,
  },
};
</script>
