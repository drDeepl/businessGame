<template>
  <div class="product-card ma-2">
    <v-card elevation="0">
      <!-- NOTE: запись ниже говорит: выбери из массива только те элементы, которых нет в modelItem.hideOn-->
      <!-- NOTE: Object.keys(modelItem.props).filter((key) => !modelItem.hideOn[key])" -->

      <div class="card-wrapper">
        <v-expand-transition :hide-on-leave="true" mode="out-in">
          <div class="product-card-content" v-if="!active">
            <div
              v-for="key in Object.keys(modelItem.props).filter(
                (key) => !modelItem.hideOn.hasOwnProperty(key)
              )"
              :key="key"
              :class="'product' + ' ' + key + ' ' + 'card-wrapper'"
            >
              <v-card-title class="product-card-title pa-1" v-if="title[key]">
                <small>{{ modelItem.props[key] }}</small>
                <span> {{ item[key] }}</span>
              </v-card-title>
              <v-card-text v-else :class="'product-card-text pa-1' + ' ' + key">
                <small class="product-card-text-label" v-if="showLabel">
                  {{ modelItem.props[key] }}
                </small>
                <span :class="'product-card-text-main' + ' ' + key">
                  {{ item[key] }}
                </span>
              </v-card-text>
            </div>
          </div>

          <v-card v-if="active">
            <v-card-text
              class="product-card-text pa-0"
              v-for="keyModelReveal in Object.keys(modelReveal.props)"
              :key="keyModelReveal"
            >
              <small>
                {{ modelReveal.props[keyModelReveal] }}
              </small>
              <span>
                {{ itemReveal[keyModelReveal] }}
              </span>
            </v-card-text>
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
    </v-card>
  </div>
</template>

<script>
import Load from '@/UI/Load.vue';
export default {
  props: {
    // NOTE: value of title is key in modelItem
    title: {type: Object, required: true},
    // NOTE: item - это сам объект с набором свойств key
    item: {
      type: Object,
      required: true,
    },
    // NOTE: model - объект, расшифровывающий свойства key в item
    modelItem: {
      type: Object,
      required: true,
    },
    showLabel: {
      type: Boolean,
      default() {
        return false;
      },
    },
    modelReveal: {type: Object},
    itemReveal: {type: Object},
  },
  data() {
    return {
      active: false,
      loading: false,
    };
  },

  methods: {
    onClickOpenLearnMore() {
      this.active = true;
    },
    onClickCloseLearnMore() {
      this.active = false;
    },
  },
  beforeUnmount() {
    this.loading = true;
  },
  unmounted() {
    this.loading = false;
  },
  compoennts: {Load},
};
</script>
