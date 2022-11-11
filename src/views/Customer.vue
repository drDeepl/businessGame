<template>
  <div class="customer-page-wrapper layout-showcase">
    <Load v-if="createTeamProducts" />
    <div v-else-if="products.length == 0">
      <p>тут есть что исправить</p>
    </div>
    <div v-else class="">
      <!-- {{ Object.keys(products) }} -->

      <div
        class="layout-showcase"
        v-for="teamName in Object.keys(products)"
        :key="teamName"
      >
        <!-- <p>{{ teamName }}</p>
        <p>{{ products[teamName] }}</p>
        <p v-for="product in products[teamName]" :key="product.product.id">
          {{ product }}
        </p> -->
        <ProductCard
          v-for="product in products[teamName]"
          :key="product.product.id"
          :isProductKit="false"
          :nameProduct="product.product.name"
          :countItems="product.count"
          :item="product"
          :modelItem="models.product"
        >
          <p class="offer-card-title team-name">
            <small>Команда:</small><span> {{ teamName }}</span>
          </p>
          <v-spacer></v-spacer>
          <v-btn color="deep-orange" text @click="onClickBuyProduct(product)">
            <span>создать предложение</span>
          </v-btn>
        </ProductCard>
      </div>
      <Form
        v-if="forms.offerPlace.active"
        :title="
          'Создать предложение для покупки \'\'' +
          forms.offerPlace.choicedProduct.product.name +
          '\'\''
        "
        :activate="forms.offerPlace.active"
        :model="models.offerPlace"
        :disableFields="{product_id: true}"
        :cancelForm="() => (forms.offerPlace.active = false)"
        :parentFunction="onClickCreateOffer"
        :load="offerCreate"
      />
      <DialogError
        v-if="forms.offerPlace.errors.length > 0"
        :active="forms.offerPlace.errors.length > 0"
        :title="forms.errorMessage.errorTitle"
      >
        <v-card-text>Решение: {{ forms.errorMessage.reloadPage }}</v-card-text>
      </DialogError>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

import DialogError from '@/UI/DialogError.vue';
import ItemStoreCard from '@/UI/ItemStoreCard.vue';
import Load from '@/UI/Load.vue';
import Form from '@/UI/Form.vue';

import ModelProduct from '@/models/model.product';
import OfferPurchasePlace from '@/models/model.offer.purchase.place';

import Message from '@/helpers/messages';
export default {
  data() {
    return {
      arrays: {
        teamProducts: {},
        teams: {},
      },
      models: {
        product: new ModelProduct(),
        offerPlace: new OfferPurchasePlace(),
      },
      forms: {
        errorMessage: new Message(),
        offerPlace: {
          active: false,
          choicedProduct: '',
          errors: [],
        },
      },
    };
  },
  async created() {
    // FIX: Получить список команд
    // FIX: Получить список готовых продуктов у каждой команды
    // FIX: Соединить в один массив с объектами вида {"nameTeam": {id: int, products: []}}
    this.$store.commit('customer/SET_CREATE_TEAM_PRODUCTS_IN_PROCESS');
    let teams = await this.$store.dispatch('team/getTeams');
    console.warn(teams);
    let teamProduct = Object();
    for (let i = 0; i < teams.length; i++) {
      let item = teams[i];
      console.warn(item);
      const teamProducts = await this.$store.dispatch(
        'products/getListProductInStore',
        item.id
      );
      if (teamProducts.length > 0) {
        teamProduct[item.name] = teamProducts;
      }
    }
    console.warn(teamProduct);
    this.arrays.teamProducts = teamProduct;
    this.$store.commit('customer/SET_CREATE_TEAM_PRODUCTS_COMPLETE');
  },
  computed: {
    ...mapGetters({
      createTeamProducts: 'customer/GET_CREATE_TEAM_PRODUCTS',
      offerCreate: 'offer/GET_offerSale',
    }),
    products() {
      return this.arrays.teamProducts;
    },
  },
  methods: {
    async onClickBuyProduct(product) {
      console.warn('CUSTOMER.VUE: onClickBuyProduct');
      this.forms.offerPlace.choicedProduct = product;
      this.forms.offerPlace.active = true;
    },
    async onClickCreateOffer(modelOfferPurchase) {
      console.warn('Customer.vue: onClickCreateOffer');
      this.$store.commit('offer/SET_offerSale');
      const choicedProduct = this.forms.offerPlace.choicedProduct;
      // console.log(choicedProduct);
      // modelOfferPurchase.count = choicedProduct.count;
      modelOfferPurchase.product_id = choicedProduct.product.id;
      console.log(modelOfferPurchase);
      try {
        await this.$store.dispatch(
          'offer/createOfferPurchase',
          modelOfferPurchase
        );
      } catch {
        const reloadPage = new Message().reloadPage;
        this.forms.offerPlace.errors.push(reloadPage);
      }
    },
  },

  components: {Load, DialogError, ProductCard: ItemStoreCard, Form},
};
</script>
