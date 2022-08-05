<template>
  <div class="productKit-store-page">
    <v-tabs class="productKit-store-page">
      <v-tab>продуктовые наборы</v-tab>
      <v-tab-item class="tab-productKit-store">
        <!-- <div v-for="productKit in productKits" :key="productKit.id">
          {{ productKit }}
        </div> -->

        <Load v-if="loading.productKits" />
        <div v-else class="productKit-store-cards">
          <OfferCard
            v-for="productKit in productKits"
            :key="productKit['$id']"
            :title="{product_kit: productKit.product_kit.product}"
            :item="productKit"
            :modelItem="cards.productKit.model"
            :itemReveal="productKit.product_kit"
            :modelReveal="cards.productKit.product.model"
            :showLabel="true"
          >
            <v-overlay
              :absolute="true"
              color="white"
              :opacity="0.85"
              :value="$store.getters['storageTeam/GET_STATE_CREATE_PRODUCT']"
              class="load-layout"
            >
              <v-progress-circular
                :rotate="360"
                :size="100"
                :width="15"
                :value="progress"
                color="orange"
              >
                {{ progress }}
              </v-progress-circular>
            </v-overlay>
            <v-btn
              outlined
              rounded
              color="orange"
              @click="onClickCreateProduct(productKit)"
              ><span>создать продукт</span></v-btn
            >
          </OfferCard>
        </div>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
// TODO: улучшить дизайн карточки
// TODO: создание продукта из продуктового набора
// TODO: продажу продуктового набора клиенту
import ProductKitStorage from '@/store/models/ProductKitStorage';
import User from '@/store/models/User';
import ProductKitStore from '@/models/model.productKitStore';
import ProductKit from '@/models/model.productKit';
import OfferCard from '@/UI/OfferCard.vue';
import Load from '@/UI/Load.vue';

// TODO: [28.07.2022] отображение продуктового набора в виде карточки + заголовки
export default {
  data() {
    return {
      timer: 0,
      progress: 0,
      loading: {
        productKits: false,
      },
      arrays: {productKits: []},
      cards: {
        productKit: {
          model: new ProductKitStore(),
          product: {
            model: new ProductKit(),
          },
        },
      },
    };
  },
  async created() {
    const username = this.$store.state.auth.user.username;
    const userData = (await User.api().getUserByUsername(username)).response
      .data;
    console.error(userData);
    const team_id = userData.team;
    console.error(team_id);

    this.loading.productKits = true;
    const response = await ProductKitStorage.api().getListProductKits(team_id);

    this.loading.productKits = false;
    const listProductKitTeam = response.response.data;
    this.arrays.productKits = listProductKitTeam;
    // this.arrays.productKits = productKits;
  },
  computed: {
    currentUserData() {
      let username = this.$store.state.auth.user.username;
      console.warn('Storage.vue\nusername ' + username);
      return this.$store
        .$db()
        .model('users')
        .query()
        .where('username', username)
        .first();
    },
    productKits() {
      return this.arrays.productKits;
    },
    getProductName() {
      return (id) => {
        return this.$store
          .$db()
          .model('products')
          .query()
          .where('id', id)
          .first().name;
      };
    },
  },
  methods: {
    onClickCreateProduct(productKit) {
      this.$store.commit('storageTeam/SET_CREATE_PRODUCT');
      console.warn('STORAGE: onClickCreateProduct');
      console.warn(productKit);
      const timeOfCreate = 15 * 1000; // sec => millisec
      // FIX: запуск таймера приготовления продукта
      let startTimer = Date.now();
      const endTimer = startTimer + timeOfCreate;
      console.warn(endTimer - startTimer);
      console.warn(endTimer);
      console.warn('TIME OF CREATE: ', timeOfCreate);
      setTimeout(
        this.$store.commit('storageTeam/SET_CREATE_PRODUCT_COMPLETE'),
        timeOfCreate
      );
      setInterval(console.warn(100 / (endTimer / Date.now())), 1000);
      // this.$store.commit('storageTeam/SET_CREATE_PRODUCT_COMPLETE');
    },
  },

  components: {
    OfferCard,
    Load,
  },
};
</script>

<style></style>
