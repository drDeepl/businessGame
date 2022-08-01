<template>
  <div>
    <v-card class="productKit-store-card-container pr-3 pl-3">
      <v-card-title class="productKit-store-card-title pa-0">
        {{ title }}:
        {{ getProductName(item.product_kit.product) }}</v-card-title
      >
      <div
        class="ma-0 pa-0"
        v-for="key in Object.keys(modelItem.props)"
        :key="key"
      >
        <v-card-text
          class="pa-0 ma-0"
          v-if="childItemModel.hasOwnProperty(key)"
        >
          <p
            class="productKit-store-card-row-container ma-2"
            v-for="childKey in Object.keys(childItemModel[key].props).filter(
              (key) => !/product/.test(key)
            )"
            :key="childKey"
          >
            <small class="productKit-store-card-row-title">
              {{ childItemModel[key].props[childKey] }}
            </small>
            <span>
              {{ item[key][childKey] }}
            </span>
          </p>
        </v-card-text>
        <v-card-text class="pa-0 ma-0" v-else>
          <p class="productKit-store-card-row-container pa-0 ma-1">
            <small class="productKit-store-card-row-title">
              {{ modelItem.props[key] }}
            </small>
            <span>{{ item[key] }}</span>
          </p>
        </v-card-text>
      </div>
      <slot></slot>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    // INFO: в модели объекта находиться свойства с заголовками для отображения
    title: String,
    modelItem: Object,
    item: Object,
    // NOTE: childItemModel = { model}
    childItemModel: Object,
    getProductName: Function,
  },
};
</script>
