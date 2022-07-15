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
      :select="forms.formAddProductKit.select"
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
            <!-- <v-card
              v-for="product in arrays.products"
              :key="product.id"
              class="product-card pa-3 ma-2"
            >
              <span
                class="product-delete"
                @click="onClickDeleteProduct(product)"
                ><close-icon class="card-close-icon"
              /></span>
              <v-spacer></v-spacer> -->

            <ProductCard
              v-for="product in arrays.products"
              :key="product.id"
              :item="product"
              :modelItem="modelsCard.product"
              :showLabel="true"
            >
              <v-btn
                outlined
                rounded
                color="#ee5544"
                class="product-group-button mb-2 mr-2 ml-2"
                @click.prevent="onClickCreateProductKit(product)"
              >
                <span>действия</span>
              </v-btn>
            </ProductCard>
            <!-- NOTE: id - мнимая часть этой карточки <span>{{ product.id }}</span> -->
            <!-- <span class="grey--text">{{ product.name }}</span>
              <div class="group-button">
                <v-btn
                  outlined
                  rounded
                  color="#31c48d"
                  class="product-group-button ma-2 pa-2"
                  @click.prevent="onClickCreateProductKit(product)"
                >
                  <div class="product-group-button">
                    <span class="product-card-text">Создать</span
                    ><span class="product-card-text">продуктовый</span>
                    <span class="product-card-text">набор</span>
                  </div>
                </v-btn>
              </div>
            </v-card> -->
          </div>
        </v-tab-item>
        <!-- INFO: список готовых продуктовых ноборов -->
        <v-tab-item class="mt-2">
          <div class="products-cards">
            <ProductCard
              v-for="productKit in arrays.productKits"
              :key="productKit.id"
              :item="productKit"
              :modelItem="modelsCard.productKit"
              :showLabel="true"
            >
              <v-btn
                outlined
                rounded
                color="#ee5544"
                class="product-group-button mb-2 mr-2 ml-2"
                @click.prevent="onClickCreateProductKit(product)"
              >
                <span>действия</span>
              </v-btn>
            </ProductCard>
          </div>
        </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
// TODO: [13.07.22]: продажу продуктовых наборов
// TODO: [14.07.22]: Переписать все запросы через ORM
// TODO: [15.07.2022] Упростить подмену product_id на product_name
import ModelProduct from '@/models/model.product';
import ModelProductKit from '@/models/model.productKit';
import CreateProduct from '@/models/model.create.product';
import CreateProductKit from '@/models/model.productKit.create';
import Form from '@/UI/Form.vue';
import ProductCard from '@/UI/ProductCard.vue';
import Product from '@/store/models/Product';
import ProductKit from '@/store/models/ProductKit';
export default {
  async created() {
    console.warn('MANUFACTURER.VUE: CREATED');
    const jwt = this.$store.state.auth.user.access;
    const listProducts = await Product.api().getListProducts(jwt);
    const listProductKits = await ProductKit.api().getListProductKits(jwt);
    console.error(listProducts.response.data);
    console.error('listProductKits:\n', listProductKits);
    // NOTE: Что, если добавить хэлпер, которые заменит в наборе
    // NOTE: product_id на product_name

    this.arrays.products = listProducts.response.data;
    // TODO: [15.07.2022] упростить функцию ниже
    const productKits = listProductKits.response.data;
    for (let key in productKits) {
      const productKit = productKits[key];
      const product = Product.query().where('id', productKit.product).get();
      const productName = product[0].name;
      productKit.product = productName;
    }
    this.arrays.productKits = listProductKits.response.data;
    // const listProductKits =
    //   this.$store.getters['productKit/GET_LIST_PRODUCT_KITS'];
    // this.arrays.products = listProducts;
    // this.arrays.productKits = listProductKits;
    // Product.insert({data: productsList});
    // console.error(this.$store.state.entities);
  },
  data() {
    return {
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
        },
        formAddProductKit: {
          active: false,
          model: new CreateProductKit(),
          select: {},
          values: {},
          disableFields: {}, // NOTE: {disable textField: value}
        },
        formSellProduct: {
          active: false,
          model: null,
          validate: false,
        },
        formSellProductKit: {
          active: false,
          model: null,
          validate: false,
        },
      },
    };
  },
  computed: {
    getJWT() {
      return this.$store.state.auth.user.access;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  methods: {
    onClickActionTab(form, title) {
      this.forms.activeForm = form;
      this.forms.titleForm = title;
      this.forms[form].active = true;
    },
    async onClickCreateProduct(createdProduct) {
      console.warn('MANUFACTURER.VUE: onClickCreateProduct');
      console.log(createdProduct);
      const jwt = this.getJWT;
      const resp = await Product.api().createProduct(createdProduct, jwt);
      console.error(resp);
    },
    async onClickCreateProductKit(product) {
      console.warn('MANUFACTURER.VUE: onClickCreateProductKit');
      this.forms.activeForm = 'formAddProductKit';
      this.forms.titleForm = 'Создать продуктовый набор';
      this.forms.formAddProductKit.select['product_id'] = [product.name];
      this.forms.formAddProductKit.active = true;
    },
    async onClickApplyCreateProductKit(productKit) {
      console.warn('MANUFACTURER.vue: onClickApplyCreateProduct');
      // NOTE: Далее должна произойти подмена названия продукта на его id
      console.error(ProductKit);
      console.log(productKit);
      const productName = productKit['product_id']; // NOTE: мини-костыль для читаемости формы
      // INFO: Имя продукта должно быть уникальным для каждого производителя
      const productId = Product.query().where('name', productName).first().id;
      productKit.product_id = productId;
      console.error(productKit);
      await ProductKit.api().createProductKit(productKit, this.getJWT);
      this.arrays.productKits = ProductKit.all();
    },
    async onClickDeleteProduct(product) {
      console.warn('MANUFACTURER.VUE: onClickDeleteProduct', product);
      await Product.api().deleteProduct(product.id, this.getJWT);
      this.arrays.products = Product.all();

      // const newProductsList = this.$store.dispatch(
      //   'products/deleteProduct',
      //   product.id
      // );
      // this.arrays.products = newProductsList;
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
