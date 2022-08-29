<template>
  <div>
    <v-card tile flat class="front-card" :disable="offerStateRunning">
      <!-- NOTE: запись ниже говорит: выбери из массива только те элементы, которых нет в modelItem.hideShow-->
      <!-- NOTE: Object.keys(modelItem.props).filter((key) => !modelItem.hideShow[key])" -->

      <div class="card-wrapper">
        <v-expand-transition :hide-on-leave="true" mode="out-in">
          <div class="offer-card-content" v-if="!active">
            <div class="offer-card-item offer-card-head">
              <v-card-title
                v-if="frontItem.hasOwnProperty('product_kit')"
                class="offer-card-title pa-1"
              >
                <small>Комплект для продукта:</small>
              </v-card-title>
              <v-card-subtitle class="pa-2 pt-4 offer-card-text-subtitle">
                <span class="offer-card-title-text">
                  {{ product }}
                </span>
              </v-card-subtitle>
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
                  {{ backItem[key] }}
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
          v-if="!active"
          class="ma-1"
          text
          color="#ee5544"
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
    traderId: {
      type: Number,
      required: false,
    },
    product: {
      type: String,
      required: false,
      default() {
        return '';
      },
    },
    frontItem: {
      type: Object,
      required: true,
    },
    backItem: {
      type: Object,
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
  },
  data() {
    return {
      active: false,
      loading: false,
      traderName: null,
    };
  },
  async created() {
    this.$store.commit('shopState/SET_OFFER_PREPARE');
    const userData = await this.$store.dispatch('user/getUser', this.traderId);
    this.traderName = userData.username;
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
