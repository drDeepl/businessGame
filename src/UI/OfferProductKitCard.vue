<template>
  <div>
    <v-card>
      <v-card-title>
        <span
          >{ "id": 10, "trader": 3, "team": 1, "price": "2.00", "timestamp":
          "2023-03-31T02:21:53.375Z", "state": "Active", "product_kit": 8 }
        </span>
      </v-card-title>
      <v-card-actions>
        <slot></slot>
      </v-card-actions>
    </v-card>
  </div>
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
  },
};
</script>
