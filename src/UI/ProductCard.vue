<template>
  <!-- <div class="product-card ma-2"> -->

  <v-card class="product-card ma-2 pa-2" elevation="12">
    <!-- NOTE: запись ниже говорит: выбери из массива только те элементы, которых нет в modelItem.hideShow-->
    <!-- NOTE: Object.keys(modelItem.props).filter((key) => !modelItem.hideShow[key])" -->
    <!-- <div>{{ item }}</div>
      <span></span>
      <div>{{ title }}</div>
      <span></span>
      <div>{{ modelItem.props }}</div> -->

    <div
      class="product-card-content"
      v-for="key in Object.keys(modelItem.props).filter(
        (key) => !modelItem.hideShow.hasOwnProperty(key)
      )"
      :key="key"
      :class="'product' + ' ' + key + ' ' + 'card-wrapper'"
    >
      <v-card-title class="product-card-title pa-1" v-if="title[key]">
        <!-- <small v-if="showLabel">{{ modelItem.props[key] }}</small> -->
        <span>{{ title[key] }}</span>
      </v-card-title>
      <v-card-text v-else :class="'product-card-text pa-1' + ' ' + key">
        <small class="product-card-text-label" v-if="showLabel">
          {{ modelItem.props[key] }}
        </small>
        <span :class="'product-card-text-value' + ' ' + key">
          {{ item[key] }}
        </span>
      </v-card-text>
    </div>
    <slot></slot>
  </v-card>
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    // NOTE: value of title is key in modelItem
    title: {
      type: Object,

      default() {
        return {};
      },
    },
    // NOTE: item - это сам объект с набором свойств key
    item: {
      type: Object,
      required: true,
      default() {
        return false;
      },
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
  },
  computed: {
    testProp() {
      return this.test;
    },
  },
};
</script>
