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
          class="offer-card-text dialog-error-title text-subtitle-1"
        >
          <span class="dialog-error-title-text">{{ title }}</span>
        </v-card-title>

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
    error: {
      type: Boolean,
      required: false,
      default() {
        return true;
      },
    },
  },
};
</script>
