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

          <v-tab class="panel-tabs tabs">
            <span class="panel-tabs text">продуктовые наборы</span>
          </v-tab>
        </div>

        <!-- // INFO: список готовых продуктов -->

        <v-tab-item class="mt-2 panel-tabs">
          <Load v-if="getListProducts || render.content" />

          <Empty
            v-else-if="arrays.products.length == 0"
            title="Склад с продуктами пуст"
          />

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
                  class="mt-1 manufacturer-action-btn"
                  outlined
                  rounded
                  color="#ee5544"
                  @click.prevent="onClickCreateProductKit(product)"
                >
                  <span class="product-btn-action-text">cоздать комплект</span>
                </v-btn>
                <v-btn
                  v-if="dataCurrentUser"
                  class="mt-1 manufacturer-action-btn"
                  outlined
                  rounded
                  color="#ee5544"
                  @click.prevent="onClickDeleteProduct(product)"
                >
                  <span class="product-btn-action-text">удалить</span>
                </v-btn>
              </v-card-actions>
            </ProductCard>
          </div>
        </v-tab-item>
        <!-- // INFO: список готовых продуктовых наборов -->

        <v-tab-item class="mt-2">
          <Load v-if="render.content" />
          <div class="products-cards" v-if="arrays.productKits.length > 0">
            <div v-for="productKit in arrays.productKits" :key="productKit.id">
              <ProductCard
                :item="productKit"
                :title="{
                  title: dict.namesProduct[productKit.product],
                }"
                :modelItem="modelsCard.productKit"
                :showLabel="true"
              >
                <v-card-actions class="d-flex flex-column justify-center">
                  <v-btn
                    class="btn-put-to-sell"
                    outlined
                    rounded
                    color="#ee5544"
                    @click.prevent="onClickSellProductKit(productKit)"
                  >
                    <span class="btn-put-to-sell-text">Продать</span>
                  </v-btn>
                  <v-btn
                    class="btn-put-to-sell"
                    text
                    color="red deep"
                    @click="onClickDeleteProductKit(productKit)"
                  >
                    Удалить
                  </v-btn>
                </v-card-actions>
              </ProductCard>
            </div>
            <!-- // INFO: Form of sell ProductKit -->
            <Form
              :activate="forms.formSellProductKit.active"
              :title="forms.titleForm"
              :model="forms.formSellProductKit.model"
              :select="forms.formSellProductKit.select"
              :disableFields="forms.formSellProductKit.disableFields"
              :parentFunction="onClickApplySellProductKit"
              :cancelForm="onClickCancelForm"
              :load="render.sellProductKit"
              :applySuccess="forms.formSellProductKit.applySucces"
            >
            </Form>
            <ErrorAlert
              v-if="forms.hasErrors"
              :errorsAr="forms.errors"
              :hasErrors="forms.hasErrors"
            >
              <v-btn class="btn-apply" @click="onClickAlertApply"
                >Понятно</v-btn
              >
            </ErrorAlert>
          </div>

          <Empty v-else title="Склад с продуктовыми наборами пуст" />
        </v-tab-item>
      </v-tabs>
      <!-- // INFO: Форма создания продукта  -->
      <Form
        :activate="forms.formAddProduct.active"
        :title="forms.titleForm"
        :model="forms.formAddProduct.model"
        :parentFunction="onClickCreateProduct"
        :cancelForm="onClickCancelForm"
        :load="STATE_createProduct"
        :applySuccess="forms.formAddProduct.applySuccess"
      >
        <v-alert v-if="forms.formAddProduct.errors.length > 0">
          <v-card-text class="ma-0 pa-0"
            >Возникли следующие ошибки:</v-card-text
          >
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
        :load="render.addProductKit"
        :errorsMessage="forms.formAddProductKit.errors"
        :applySuccess="forms.formAddProductKit.applySuccess"
      >
      </Form>
      <!-- // INFO: Всплывающее предупреждение  -->

      <ErrorAlert
        v-if="alert.warn.active"
        :errorsAr="alert.warn.message"
        :hasErrors="alert.warn.active"
      >
        <v-btn
          class="btn-cancel"
          v-if="!deleteState.product.isDelete"
          :loading="render.delete"
          @click="onClickApplyDeleteProduct"
          >Удалить</v-btn
        >
        <v-btn class="btn-apply" @click="onClickCancelDeleteProduct"
          >Закрыть</v-btn
        >
      </ErrorAlert>
      <ErrorAlert
        v-if="forms.message.active"
        :errorsAr="[forms.message.text]"
        :hasErrors="forms.message.active"
      >
        <v-btn
          v-if="forms.message.text.toLowerCase() != 'продуктовый набор удалён!'"
          class="btn-cancel"
          @click="onClickApplyDeleteProductKit()"
          :loading="render.delete"
          >Удалить</v-btn
        >
        <v-btn
          :disabled="render.delete"
          class="btn-apply"
          @click="
            () => {
              forms.message.active = false;
            }
          "
          >Закрыть</v-btn
        >
      </ErrorAlert>
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
import Empty from '@/UI/Empty.vue';

import Load from '@/UI/Load.vue';
import ErrorAlert from '@/UI/ErrorAlert.vue';

import {mapGetters} from 'vuex';

export default {
  components: {
    Load,
    Form,
    ProductCard,
    ErrorAlert,
    Empty,
  },
  data() {
    return {
      render: {
        content: false,
        delete: false,
        sellProductKit: false,
        addProductKit: false,
      },
      currentOfferModel: new CreateSellOffer(),
      arrays: {
        products: [],
        productKits: [],
        namesTeam: [],
      },
      dict: {
        namesTeam: {},
        teams: {},
        deletedProductKits: {}, // INFO: {id: true},
        namesProduct: {},
      },
      deleteState: {
        errors: [],
        data: {},
        product: {isDelete: false},
      },
      tabs: {
        tabsAction: this.$store.getters['products/GET_LIST_TABS_ACTION'],
        tabsView: this.$store.getters['products/GET_LIST_TABS_VIEW'],
      },

      modelsCard: {
        product: new ModelProduct(),
        productKit: new ModelProductKit(),
      },
      currentItem: {data: null},
      alert: {
        warn: {
          active: false,
          message: [],
        },
      },
      forms: {
        hasErrors: false,
        errors: [],
        activeForm: '',
        titleForm: '',
        message: {text: '', active: false},
        formAddProduct: {
          active: false,
          model: new CreateProduct(),
          validate: false,
          applySuccess: false,
          errors: [],
        },
        formAddProductKit: {
          active: false,
          model: new CreateProductKit(),
          select: {},
          values: {},
          applySuccess: false,
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
    this.render.content = true;
    const products = await this.$store.dispatch('products/getProducts');
    const productKits = await this.$store.dispatch('productKit/getProductKits');
    console.error('PRODUCT KITS');
    console.log(productKits);
    // FIXED: Added to database field "deleted"
    // const deletedProductKits = localStorage.getItem('deletedProductKits')
    //   ? JSON.parse(localStorage.getItem('deletedProductKits'))
    //   : {};

    // this.dict.deletedProductKits = deletedProductKits;
    const productKitWithoutDeleted = productKits.filter((productKit) => {
      return !productKit.is_deleted;
    });

    const teams = await this.$store.dispatch('team/getTeams');

    let arrayNamesTeam = [];
    let dictNamesTeam = {};
    let dictTeams = {};
    let dictNamesProduct = {};
    products.forEach(function (product) {
      dictNamesProduct[product.id] = product.name;
    });
    teams.forEach(function (team) {
      const teamName = team.name;
      arrayNamesTeam.push(teamName);
      dictNamesTeam[teamName] = team.id;
      dictTeams[Number(team.id)] = team;
    });

    console.log(productKits);
    this.arrays.namesTeam = arrayNamesTeam;
    this.arrays.productKits = productKitWithoutDeleted;
    this.arrays.products = products;
    this.dict.namesTeam = dictNamesTeam;
    this.dict.teams = dictTeams;
    this.dict.namesProduct = dictNamesProduct;
    this.render.content = false;
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

      dataCurrentUser: 'user/GET_CURRENT_USER_DATA',
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

    productKits() {
      console.warn('MANUFACTURER.VUE: productKits');
      return this.arrays.productKits;
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
    // INFO: Utils

    clearCurrentItem() {
      console.log('CLEAR CURRENT ITEM');
      this.currentItem.data = null;
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
    // NOTE: ProductKits
    onClickCreateProductKit(product) {
      console.warn('MANUFACTURER.VUE: onClickCreateProductKit');
      this.forms.activeForm = 'formAddProductKit';
      this.forms.titleForm = 'Создать продуктовый набор';
      this.forms.formAddProductKit.model.data['product_id'] = product.id;
      this.forms.formAddProductKit.disableFields['product_id'] = true;
      this.forms.formAddProductKit.active = true;
    },
    async onClickCreateProduct(createdProduct) {
      console.warn('MANUFACTURER.VUE: onClickCreateProduct');
      this.$store.commit('products/SET_PRODUCT_CREATE');
      this.forms.formAddProduct.applySuccess = false;
      this.forms.formAddProduct.errors = [];
      createdProduct.name = createdProduct.name.toLowerCase();

      console.log(createdProduct);
      // const productsWithCurrentName = this.$store
      //   .$db()
      //   .model('products')
      //   .query()
      //   .where('name', createdProduct.name)
      //   .get();
      const productsWithCurrentName = [];
      if (productsWithCurrentName.length == 0) {
        const product = await this.$store.dispatch(
          'products/createProduct',
          createdProduct
        );
        console.log(`CREATED PRODUCT: ${product}`);
        this.dict.namesProduct[product.id] = product.name;
        this.arrays.products.push(product);
      } else {
        const message =
          'Продукт с названием "' + createdProduct.name + '" уже существует';
        this.forms.formAddProduct.errors.push(message);
      }
      this.$store.commit('products/SET_PRODUCT_CREATED');
      this.$store.commit('products/SET_LIST_PRODUCT_UPDATE_RUN');
      this.forms.formAddProduct.applySuccess = true;
    },

    async onClickApplyCreateProductKit(productKit) {
      console.warn('MANUFACTURER.vue: onClickApplyCreateProduct');
      this.render.addProductKit = true;
      this.forms.formAddProductKit.errors = [];
      this.forms.formAddProductKit.applySuccess = false;
      console.error(productKit);
      console.log(this.arrays.products);
      // NOTE: is check exists product kit

      // NOTE: end check exists product kit
      const createdProductKit = await this.$store.dispatch(
        'productKit/createProductKit',
        productKit
      );
      console.log('CREATED PRODUCT KIT:', createdProductKit);
      this.forms.formAddProductKit.applySuccess = true;
      this.arrays.productKits.push(createdProductKit);
      // }
      this.$store.commit('productKit/SET_CREATE_PRODUCT_KIT_COMPLETE');
      this.render.addProductKit = false;
    },
    async updateListProductKits() {
      console.warn('updateListProductKits');
      const productKits = await this.$store.dispatch(
        'productKit/getProductKits'
      );
      this.arrays.productKits = productKits;
    },
    upgradeProductKits() {
      console.warn('upgradeProductKits');
      const currentProductKits = this.arrays.productKits;
      const deletedProductKits = this.dict.deletedProductKits;
      console.log(deletedProductKits);
      const newProductKits = currentProductKits.filter((productKit) => {
        return !deletedProductKits[productKit.id];
      });
      console.log('NEW PRODUCTKITS', newProductKits);
      this.arrays.productKits = newProductKits;
    },

    async onClickApplyDeleteProductKit() {
      console.warn('MANUFACTURER: onClickApplyDeleteProductKit');
      const productKit = this.currentItem.data;
      console.log('productKit', productKit);
      this.render.delete = true;
      this.upgradeProductKits();
      const responseDeletePK = await this.$store.dispatch(
        'productKit/setStateDeletedProductKit',
        productKit.id
      );
      console.error('DELETED PRODUCT KIT');
      console.log(responseDeletePK);
      if (responseDeletePK.status == 200) {
        this.forms.message.text = 'Продуктовый набор удалён!';
        this.clearCurrentItem();
      } else {
        this.forms.message.text = responseDeletePK.message;
      }

      this.render.delete = false;
    },

    onClickDeleteProductKit(productKit) {
      console.warn('MANUFACTURER: onClickDeleteProductKit');
      console.log('productKit for delete', productKit);
      this.currentItem.data = productKit;
      this.forms.message.text = 'Удалить продуктовый набор?';
      this.forms.message.active = true;
    },
    onClickSellProductKit(productKit) {
      console.warn('MANUFACTURER.VUE: onClickSellProductKit');
      console.warn(productKit);

      this.forms.activeForm = 'formSellProductKit';
      this.forms.titleForm = 'выставить на продажу';
      this.forms.formSellProductKit.disableFields['product_kit_id'] = true;
      this.forms.formSellProductKit.model.data['product_kit_id'] =
        productKit.id;
      this.forms.formSellProductKit.select['team_id'] = this.arrays.namesTeam;
      this.forms.formSellProductKit.active = true;
      this.currentItem.data = productKit;
    },
    async onClickApplySellProductKit(saleOfferProductKit) {
      console.warn('MANUFACTURER: onClickApplySellProductKit');
      this.forms.formSellProductKit.applySucces = false;
      this.render.sellProductKit = true;
      console.log(saleOfferProductKit);
      const teamId = this.dict.namesTeam[saleOfferProductKit['team_id']];
      saleOfferProductKit['team_id'] = teamId;
      console.log(saleOfferProductKit);
      const currentTeam = this.dict.teams[Number(teamId)];
      const teamAccount = currentTeam.account;
      console.log('TEAM ACC', teamAccount);
      const accountResponse = await this.$store.dispatch(
        'account/getAccountById',
        teamAccount
      );
      const account = accountResponse.status == 200 ? accountResponse.data : {};
      const teamBalance = Number(account.balance);

      if (saleOfferProductKit.price <= teamBalance) {
        const responseOfferSalePlace = await this.$store.dispatch(
          'offer/offerSalePlace',
          {
            team_id: teamId,
            price: saleOfferProductKit.price,
            product_kit_id: saleOfferProductKit.product_kit_id,
          }
        );
        console.warn('RESPONSE OFFER SALE PLACE');
        console.log(responseOfferSalePlace);
        await this.$store.dispatch(
          'productKit/setStateDeletedProductKit',
          saleOfferProductKit.product_kit_id
        );

        if (responseOfferSalePlace.status != 200) {
          this.forms.hasErrors = true;
          const msgError = 'У команды недостаточно средств для покупки';
          this.forms.errors.push(msgError);
          return;
        }
        this.forms.formSellProductKit.applySucces = true;
      } else {
        this.forms.hasErrors = true;
        const msgError = 'У команды недостаточно средств для покупки';
        this.forms.errors.push(msgError);
      }
      this.render.sellProductKit = false;
      setTimeout(() => {
        this.$store
          .dispatch('productKit/getProductKits')
          .then((productKits) => (this.arrays.productKits = productKits));
      }, 3000);
    },

    // NOTE: Products
    onClickDeleteProduct(product) {
      this.alert.warn.active = true;

      this.alert.warn.message.push(
        `Удалить продукт "${product.name}"?`,
        `Будут так же удалены продуктовые наборы для выбранного продукта`
      );
      this.currentItem.data = product;
    },
    onClickCancelDeleteProduct() {
      this.alert.warn.active = false;
      this.alert.warn.message = [];
      this.deleteState.product.isDelete = false;
    },
    async onClickApplyDeleteProduct() {
      console.warn('MANUFACTURER.VUE: onClickDeleteProduct');
      this.$store.commit('products/SET_DELETE_PRODUCT');
      this.render.delete = true;
      const product = this.currentItem.data;
      console.warn(product);

      const products = this.arrays.products.filter((item) => {
        return item.id != product.id;
      });
      const productKits = this.arrays.productKits.filter((item) => {
        return item.product != product.id;
      });
      this.arrays.productKits = productKits;
      this.arrays.products = products;
      const responseDeleteProduct = await this.$store.dispatch(
        'products/setStateDeletedProduct',
        product.id
      );
      const responseDeleteRelatedProductKits = await this.$store.dispatch(
        'productKit/setDeletedProductKitWithProduct',
        product.id
      );
      if (
        responseDeleteProduct.status == 200 &&
        responseDeleteRelatedProductKits.status == 200
      ) {
        this.alert.warn.message = ['Продукт был успешно удалён!✔️'];
        this.render.delete = false;
        this.deleteState.product.isDelete = true;
      } else {
        this.$store.commit('products/SET_DELETE_PRODUCT_ERROR');
        this.deleteState.errors.push(responseDeleteProduct.message);
      }
    },

    onClickCancelForm() {
      console.warn('MANUFACTURER.VUE: onClickCancelForm');
      const activeForm = this.forms.activeForm;
      console.error(activeForm);
      this.forms[activeForm].active = false;
    },
    onClickAlertApply() {
      console.warn('MANUFACTURER: onClickAlertApply');
      this.forms.hasErrors = false;
      this.forms.errors = [];
    },
  },
};
</script>
