<template>
  <div>
    <v-card
      v-if="showAlertSuccess"
      elevation="1"
      class="flex-centered card-alert card-main-layout"
    >
      <success-icon class="alert-success mt-2" :size="78"></success-icon>
      <v-card-title class="ma-0 pa-0 alert-card-title">{{
        title
      }}</v-card-title>
      <slot></slot>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {type: String, required: true},
    showAlertSuccess: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>
