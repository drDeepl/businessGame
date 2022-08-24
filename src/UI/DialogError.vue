<template>
  <div class="dialog-error-wrapper">
    <v-dialog persistent max-width="20em" v-model="active">
      <v-card class="offer-low-balance">
        <v-card-title
          class="offer-card-text offer-low-balance-title text-subtitle-1"
        >
          <span class="offer-low-balance-title-text">{{ title }}</span>
        </v-card-title>
        <slot></slot>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    title: {type: String, required: true},
    active: {type: Boolean, required: true},
  },
};
</script>
