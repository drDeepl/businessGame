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
    <!-- NOTE: Форма создания продукта  -->
    <Form
      :activate="forms.formAddProduct.active"
      :title="forms.titleForm"
      :model="forms.formAddProduct.model"
      :parentFunction="onClickCreateProduct"
      :cancelForm="onClickCancelForm"
    >
    </Form>
    <!-- NOTE: Форма создания продуктового набора-->
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
      <v-tabs
        color="#6c63ff"
        class="manufacturer-layout manufacturer-tabs mt-2"
      >
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
              :modelItem="modelsCard.product"
              :showLabel="true"
            >
              <v-menu bottom>
                <template v-slot:activator="{on, attrs}">
                  <v-btn
                    outlined
                    rounded
                    color="#ee5544"
                    class="product-group-button mb-2 mr-2 ml-2"
                    v-bind="attrs"
                    v-on="on"
                    @click.prevent="onClickCardActions(product)"
                  >
                    <span>действия</span>
                  </v-btn>
                </template>
                <v-list flat class="container-card-actions">
                  <v-list-item
                    class="card-action"
                    @click.prevent="onClickCreateProductKit(product)"
                  >
                    <span>Создать продуктовый набор</span>
                  </v-list-item>
                  <v-list-item
                    class="card-action"
                    @click.prevent="onClickDeleteProduct(product)"
                  >
                    <span>Удалить</span>
                  </v-list-item>
                </v-list>
              </v-menu>
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
              :modelItem="modelsCard.productKit"
              :showLabel="true"
            >
              <div class="card-action-btn">
                <v-btn
                  outlined
                  rounded
                  color="#ee5544"
                  class="product-group-button mb-2 mr-2 ml-2"
                  @click.prevent="onClickDeleteProductKit"
                >
                  <span>удалить</span>
                </v-btn>
                <v-btn
                  outlined
                  rounded
                  color="#ee5544"
                  class="product-group-button mb-2 mr-2 ml-2"
                  @click.prevent="onClickSellProductKit(productKit)"
                >
                  <span>продать</span>
                </v-btn>
              </div>
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
    const jwt = this.$store.state.auth.user.access;
    await Product.api().getListProducts(jwt);
    await ProductKit.api().getListProductKits(jwt);
    this.arrays.products = this.$store.$db().model('products').all();
    this.arrays.productKits = this.$store.$db().model('productKits').all();
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
      arrays: {
        products: null,
        productKits: null,
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
  mounted() {},
  computed: {
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
      let pk = this.$store.$db().model('productKits').all();
      for (let key in pk) {
        const product = pk[key].product;
        const productName = this.$store
          .$db()
          .model('products')
          .query()
          .where('id', product)
          .get()[0].name;
        pk[key].product = productName;
      }

      return pk;
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
      console.log(createdProduct);
      const jwt = this.getJWT;
      const resp = await Product.api().createProduct(createdProduct, jwt);
      console.error(resp);
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
    onClickSellProductKit(productKit) {
      console.warn('MANUFACTURER.VUE: onClickSellProductKit');
      console.warn(productKit);
      this.forms.activeForm = 'formSellProductKit';
      this.forms.titleForm = 'Продать продуктовый набор';
      this.forms.formSellProductKit.disableFields['product_kit_id'] = true;
      this.forms.formSellProductKit.model.data['product_kit_id'] =
        productKit.id;

      // FIX:  Найти способ подмены данных при помощи словаря
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
