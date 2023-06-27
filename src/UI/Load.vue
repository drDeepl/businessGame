<template>
  <div class="load-wrapper">
    <v-progress-circular
      :color="color"
      class="load-bar"
      indeterminate
      :size="size"
    ></v-progress-circular>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      required: false,
      default() {
        return '#ee5544';
      },
    },
    size: {
      type: String,
      required: false,
      default() {
        return '64';
      },
    },
  },
};
</script>
