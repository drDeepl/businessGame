<template>
  <div>
    <v-dialog persistent width="30%" v-model="hasErrors">
      <v-sheet class="d-flex flex-column justify-center alert-error-layer">
        <v-card-text v-for="idx in Object.keys(errorsAr)" :key="idx">
          {{ errorsAr[idx] }}
        </v-card-text>
        <v-card-actions class="d-flex justify-center">
          <slot> </slot
        ></v-card-actions>
      </v-sheet>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    errorsAr: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    hasErrors: {
      type: Boolean,
      required: true,
      default() {
        return false;
      },
    },
  },
};
</script>
