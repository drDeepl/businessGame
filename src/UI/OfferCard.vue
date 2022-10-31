<template>
  <div>
    <v-card tile flat class="front-card" :disable="offerStateRunning">
      <!-- NOTE: запись ниже говорит: выбери из массива только те элементы, которых нет в modelItem.hideShow-->
      <!-- NOTE: Object.keys(modelItem.props).filter((key) => !modelItem.hideShow[key])" -->

      <div class="card-wrapper">
        <v-expand-transition :hide-on-leave="true" mode="out-in">
          <div class="offer-card-content" v-if="!active">
            <div class="offer-card-item offer-card-head">
              <v-card-title class="offer-card-title pa-1">
                <small>{{ title }}</small>
              </v-card-title>
              <!-- v-if="!!backCardData" -->
              <v-card-subtitle
                v-if="!isOfferProductKit"
                class="pa-2 pt-4 offer-card-text-subtitle"
              >
                <span class="offer-card-title-text">
                  <v-badge
                    class="pl-2"
                    color="red lighten-1"
                    :content="badgeValue + ' шт.'"
                    inline
                  >
                    <span>
                      {{ productName }}
                    </span>
                  </v-badge>
                </span>
              </v-card-subtitle>
              <v-card-subtitle
                v-else-if="isOfferProductKit && !!backCardData"
                class="pa-2 pt-4 offer-card-text-subtitle"
              >
                {{ backCardData.product_data.name }}
              </v-card-subtitle>

              <v-skeleton-loader
                v-else
                type="text"
                class="offer-card-item trader"
              >
              </v-skeleton-loader>
            </div>

            <div v-if="!!traderName" class="offer-card-item trader">
              <v-card-text class="offer-card-text-subtitle offer-card-subtitle">
                <small class="offer-card-text-label">
                  {{ frontModelItem.props.trader }}
                </small>
                <span class="offer-card-text-trader">
                  {{ traderName }}
                </span>
              </v-card-text>
            </div>
            <v-skeleton-loader
              v-else
              type="text"
              class="offer-card-item trader"
            >
            </v-skeleton-loader>

            <div
              :class="'offer-card-item ' + key"
              v-for="key in Object.keys(frontModelItem.props).filter(
                (key) => !frontModelItem.hideShow[key]
              )"
              :key="key"
            >
              <v-card-text class="offer-card-text">
                <small class="offer-card-text-label">
                  {{ frontModelItem.props[key] }}
                </small>
                <span :class="'offer-card-text-main ' + key">
                  {{ frontItem[key] }}
                </span>
              </v-card-text>
            </div>
          </div>

          <v-card elevation="0" v-else-if="active" class="back-card">
            <div
              :class="'offer-card-item ' + key"
              v-for="key in Object.keys(backModelItem.props).filter(
                (key) => !backModelItem.hideShow[key]
              )"
              :key="key"
            >
              <v-card-text class="offer-card-text">
                <small class="offer-card-text-label">
                  {{ backModelItem.props[key] }}
                </small>
                <span :class="'offer-card-text-main ' + key">
                  {{ backCardData[key] }}
                </span>
              </v-card-text>
            </div>
            <v-btn
              class="ma-1"
              text
              color="#ee5544"
              @click="onClickCloseLearnMore"
            >
              <span>закрыть</span>
            </v-btn>
          </v-card>
        </v-expand-transition>
      </div>
      <v-card-actions>
        <v-btn
          v-if="!active && backCardProductKit"
          class="ma-1"
          text
          color="#ee5544"
          :loading="!backCardData"
          @click="onClickOpenLearnMore"
        >
          <span>подробнее</span>
        </v-btn>
        <slot> </slot>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  props: {
    title: {
      type: String,
      required: false,
      default() {
        return '';
      },
    },
    badgeValue: {
      type: String,
      required: false,
      default() {
        return '';
      },
    },
    traderId: {
      type: Number,
      required: false,
    },
    product: {
      type: Number,
      required: false,
      default() {
        return -1;
      },
    },
    frontItem: {
      type: Object,
      required: true,
    },
    backCardProductKit: {
      type: Number,
      required: false,
    },
    showLabel: {
      type: Boolean,
      default() {
        return false;
      },
    },
    frontModelItem: {type: Object},
    backModelItem: {type: Object},
    isOfferProductKit: {
      type: Boolean,
      required: false,
      default() {
        false;
      },
    },
  },

  data() {
    return {
      active: false,
      loading: false,
      traderName: null,
      backCardData: null,
      productName: '',
    };
  },
  async created() {
    this.$store.commit('shopState/SET_OFFER_PREPARE');
    const userData = await this.$store.dispatch('user/getUser', this.traderId);
    this.traderName = userData.username;

    if (this.isOfferProductKit) {
      const productKit = this.$store
        .$db()
        .model('productKits')
        .query()
        .with('product_data')
        .find(this.backCardProductKit);
      this.backCardData = productKit;
    } else {
      const product = this.$store.$db().model('products').find(this.product);
      this.productName = product.name;
    }

    this.$store.commit('shopState/SET_OFFER_PREPARE_COMPLETE');
  },
  computed: {
    ...mapGetters({offerStateRunning: 'shopState/GET_buyOffer_STATE_RUNNING'}),
  },
  methods: {
    onClickOpenLearnMore() {
      this.active = true;
    },
    onClickCloseLearnMore() {
      this.active = false;
    },
    async onClickBuyOffer(item) {
      this.loading = this.offerStateRunning;
      console.warn('OFFER_CARD: onClickBuyOffer');
      await this.btnBuyOffer(item);
      this.loading = this.offerStateRunning;
    },
  },
};
</script>
