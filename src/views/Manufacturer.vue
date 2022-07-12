<template>
  <div class="manufacturer-layout">
    <div>Страница поставщика</div>
    <div class="manufacturer-actions">
      <v-btn
        outlined
        color="#6c63ff"
        rounded
        v-for="tab in tabs.tabsAction"
        :key="tab.form"
        @click.prevent="onClickActionTab(tab.form, tab.label)"
        >{{ tab.label }}
      </v-btn>
    </div>

    <!-- NOTE: Форма создания продукта  -->
    <Form
      :activate="activeForm"
      :title="forms.titleForm"
      :model="forms.formAddProduct.model"
      :cancelForm="onClickCancelForm"
    >
    </Form>
    <div>
      <v-tabs class="manufacturer-layout manufacturer-tabs">
        <v-tab color="#6c63ff" v-for="tab in tabs.tabsView" :key="tab.view">
          {{ tab.label }}
        </v-tab>
        <!-- INFO: список готовых продуктов -->

        <!-- INFO: список готовых продуктовых ноборов -->
        <v-tab-item>
          <div class="products-cards">
            <v-card
              v-for="product in arrays.products"
              :key="product.id"
              class="product-card pa-3 ma-2"
              ><span>{{ product.id }}</span>
              <span>{{ product.name }}</span>
              <v-btn
                outlined
                rounded
                color="#31c48d"
                class="product-group-button ma-2 pa-2"
              >
                <div class="product-group-button">
                  <span class="product-card-text">Создать</span
                  ><span class="product-card-text">продуктовый</span>
                  <span class="product-card-text">набор</span>
                </div>
              </v-btn></v-card
            >
          </div>
        </v-tab-item>
        <v-tab-item> </v-tab-item>
      </v-tabs>
    </div>
  </div>
</template>

<script>
// [13.07.22] TODO: Закончить функцию создания продукта
// [13.07.22] TODO: Сделать функию создания продуктового набора

import CreateProduct from '@/models/model.create.product';
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
          model: new CreateProduct()
        },
        formSellProduct: {
          active: false,
          model: null
        }
      }
    };
  },
  computed: {
    activeForm() {
      const activeForm = this.forms.activeForm;
      if (activeForm.length > 0) {
        return this.forms[activeForm].active;
      } else {
        return false;
      }
    }
  },

  methods: {
    onClickActionTab(form, title) {
      this.forms.activeForm = form;
      this.forms.titleForm = title;
      this.forms[form].active = true;
    },
    onClickCancelForm() {
      const activeForm = this.forms.activeForm;
      this.forms[activeForm].active = false;
    }
  },
  components: {
    Form
  }
};
</script>
