<template>
  <div class="card-main-layout card-container pa-1">
    <v-card class="store-card-product-kit-wrapper" elevation="0">
      <v-card-title class="store-card-product-kit-title row-container pa-0">
        <small v-if="isProductKit">Комплект для продукта:</small>

        <!-- <span>{{ item }}</span> -->
        <div class="d-flex flex-column align-center justify-center">
          <span class="">{{ nameProduct }}</span>
          <v-badge
            v-if="countItems"
            :value="countItems"
            :content="countItems + ' шт.'"
            color="red"
            inline
          >
          </v-badge>
        </div>
      </v-card-title>

      <v-card-text
        :class="
          'pa-1 row-container store-card-product-kit-content-item' +
          ' ' +
          property
        "
        v-for="property in Object.keys(modelItem.props).filter(
          (key) => !modelItem.hideShow[key]
        )"
        :key="property"
      >
        <small class="">{{ modelItem.props[property] }}</small>
        <span>{{ item[property] }}</span>
      </v-card-text>
    </v-card>
    <v-card-actions class="d-flex justify-center"><slot></slot></v-card-actions>
  </div>
</template>

<script>
export default {
  props: {
    isProductKit: {
      type: Boolean,
      required: false,
      default() {
        return true;
      },
    },
    nameProduct: {type: String, required: true},
    countItems: {type: Number, required: false},
    item: {type: Object, required: true},
    modelItem: {type: Object, required: true},
  },
};
</script>
