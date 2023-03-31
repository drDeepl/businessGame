<template>
  <div class="dialog-error-wrapper">
    <v-dialog
      persistent
      max-width="20em"
      v-model="active"
      class="card-main-layout"
    >
      <v-card class="dialog-error" elevation="0">
        <v-card-title
          class="offer-card-text dialog-error-title font-weight-medium"
        >
          <span class="dialog-error-title-text">
            {{ title }}
          </span>
        </v-card-title>
        <v-divider class="mt-1"></v-divider>

        <slot></slot>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
      default() {
        return '';
      },
    },
    active: {type: Boolean, required: true},
  },
};
</script>
