<template>
  <div class="dialog-alert-wrapper">
    <v-dialog persistent max-width="20em" v-model="active">
      <slot></slot>
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
