<template>
  <div class="card-main-layout card-container pa-1">
    <v-card class="store-card-product-kit-wrapper" elevation="0">
      <v-badge
        :value="countProductKits"
        :content="countProductKits"
        color="red"
        class="store-card-product-kit-subtitle mt-2"
      >
        <v-card-title class="store-card-product-kit-title row-container pa-0">
          <small>Комплект для продукта:</small>
          <span>{{ nameProduct }}</span>
        </v-card-title>
      </v-badge>
      <!-- <v-card-subtitle class="row-container pa-0 ma-0">
        {{ countProductKits }} шт.
      </v-card-subtitle> -->

      <v-card-text
        :class="
          'pa-1 row-container store-card-product-kit-content-item' +
          ' ' +
          property
        "
        v-for="property in Object.keys(modelProductKit.props).filter(
          (key) => !modelProductKit.hideShow[key]
        )"
        :key="property"
      >
        <small class="">{{ modelProductKit.props[property] }}</small>
        <span>{{ productKit[property] }}</span>
      </v-card-text>

      <slot></slot>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    nameProduct: {type: String, required: true},
    countProductKits: {type: Number, required: false},
    productKit: {type: Object, required: true},
    modelProductKit: {type: Object, required: true},
  },
};
</script>
