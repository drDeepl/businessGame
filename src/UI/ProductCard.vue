<template>
  <div class="product-card ma-2">
    <v-card elevation="0" class="pa-2 ma-2">
      <div v-for="key in Object.keys(item)" :key="key">
        <v-card-text class="product-card-text pa-1" v-if="key != 'id'">
          <small class="product-card-text-label" v-if="showLabel">{{
            modelItem.props[key]
          }}</small>
          <span
            v-if="key != '$id'"
            :class="'product-card-text-main' + ' ' + key"
            >{{ item[key] }}</span
          >
        </v-card-text>
      </div>
      <slot></slot>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    // NOTE: item - это сам объект с набором свойств key
    item: {
      type: Object,
    },
    // NOTE: model - объект, расшифровывающий свойства key в item
    modelItem: {
      type: Object,
    },
    showLabel: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>
