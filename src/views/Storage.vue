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
          <!-- <div>{{ productKits }}</div> -->
          <!-- <div>{{ changeProductIdOnName(productKit) }}</div> -->

          <div v-for="productKit in productKits" :key="productKit['$id']">
            <ProductKitStoreCard
              :title="'Продуктовый набор для продукта'"
              :item="productKit"
              :modelItem="cards.productKit.model"
              :childItemModel="{product_kit: cards.productKit.childModel}"
              :getProductName="getProductName"
            >
              <v-btn class="productKit-store-card-btn" outlined rounded
                ><span class="productKit-store-card-btn text"
                  >создать продукт</span
                ></v-btn
              >
            </ProductKitStoreCard>
          </div>
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
import ProductKitStoreCard from '@/UI/ProductKitStoreCard.vue';
import Load from '@/UI/Load.vue';

// TODO: [28.07.2022] отображение продуктового набора в виде карточки + заголовки
export default {
  data() {
    return {
      loading: {
        productKits: false,
      },
      arrays: {productKits: []},
      cards: {
        productKit: {
          model: new ProductKitStore(),
          childModel: new ProductKit(),
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
  methods: {},

  components: {
    ProductKitStoreCard,
    Load,
  },
};
</script>

<style></style>
