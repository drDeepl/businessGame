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
      :parentFunction="onClickCreateProductKit"
      :cancelForm="onClickCancelForm"
    >
      {{ arrays.products }}
      {{ forms.formAddProductKit.select }}
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

        <!-- INFO: список готовых продуктовых ноборов -->
        <v-tab-item class="mt-2">
          <div class="products-cards">
            <v-card
              v-for="product in arrays.products"
              :key="product.id"
              class="product-card pa-3 ma-2"
            >
              <span
                class="product-delete"
                @click="onClickDeleteProduct(product)"
                ><font-awesome-icon icon="times-circle"
              /></span>
              <v-spacer></v-spacer>
              <!-- NOTE: id - мнимая часть этой карточки <span>{{ product.id }}</span> -->
              <span>{{ product.name }}</span>
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
            </v-card>
          </div>
        </v-tab-item>
        <v-tab-item> </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
// [13.07.22] TODO: Сделать функию создания продуктового набора
// [13.07.22] TODO: добавление продуктового набора в бд
// [13.07.22] TODO: продажу продуктовых наборов

import CreateProduct from '@/models/model.create.product';
import CreateProductKit from '@/models/model.productKit.create';
import Form from '@/UI/Form.vue';
export default {
  async created() {
    await this.$store.dispatch('products/getListProducts');
    const listProducts = this.$store.getters['products/GET_LIST_PRODUCTS'];
    this.arrays.products = listProducts;
  },
  data() {
    return {
      tabs: {
        tabsAction: this.$store.getters['products/GET_LIST_TABS_ACTION'],
        tabsView: this.$store.getters['products/GET_LIST_TABS_VIEW']
      },
      arrays: {
        products: null
      },
      forms: {
        activeForm: '',
        titleForm: '',
        formAddProduct: {
          active: false,
          model: new CreateProduct(),
          validate: false
        },
        formAddProductKit: {
          active: false,
          model: new CreateProductKit(),
          validate: false,
          select: [],
          disableFields: {} // NOTE: {disable textField: value}
        },
        formSellProduct: {
          active: false,
          model: null,
          validate: false
        },
        formSellProductKit: {
          active: false,
          model: null,
          validate: false
        }
      }
    };
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
      this.forms.formAddProduct.validate = true;
      const product = await this.$store.dispatch(
        'products/productCreate',
        createdProduct
      );
      console.error(product);
    },
    async onClickCreateProductKit(product) {
      // TODO:
      console.warn('MANUFACTURER.VUE: onClickCreateProductKit');
      this.forms.activeForm = 'formAddProductKit';
      this.forms.titleForm = 'Создать продуктовый набор';
      this.forms.formAddProductKit.disableFields['product_id'] = product.name;
      this.forms.formAddProductKit.active = true;
      console.error(product);
    },
    async onClickApplyCreateProductKit() {
      // TODO:
    },
    async onClickDeleteProduct(product) {
      console.warn('MANUFACTURER.VUE: onClickDeleteProduct');
      const newProductsList = this.$store.dispatch(
        'products/deleteProduct',
        product.id
      );
      this.arrays.products = newProductsList;
    },
    onClickCancelForm() {
      console.warn('MANUFACTURER.VUE: onClickCancelForm');
      const activeForm = this.forms.activeForm;
      console.error(activeForm);
      this.forms[activeForm].active = false;
    }
  },
  components: {
    Form
  }
};
</script>
