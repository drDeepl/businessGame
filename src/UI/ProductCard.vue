<template>
  <v-card class="card-main-layout ma-2 pa-2">
    <v-card-title
      class="product-card-title pa-1"
      v-for="array in Object.entries(title)"
      :key="array[0]"
    >
      <span>{{ array[1] }}</span>
    </v-card-title>
    <div
      class="product-card-content"
      v-for="key in Object.keys(modelItem.props).filter(
        (key) => !modelItem.hideShow.hasOwnProperty(key)
      )"
      :key="key"
      :class="'product' + ' ' + key + ' ' + 'card-wrapper'"
    >
      <v-card-text :class="'product-card-text pa-1' + ' ' + key">
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
</template>

<script>
export default {
  props: {
    title: {
      type: Object,

      default() {
        return {};
      },
    },

    item: {
      type: Object,
      required: true,
      default() {
        return false;
      },
    },

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
