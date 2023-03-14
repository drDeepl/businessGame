<template>
  <div>
    <v-sheet class="d-flex flex-column justify-center align-center mt-5">
      <store-empty class="ml-15 icon-empty" :size="150"></store-empty>
      <v-card-title class="text--secondary ml-15 pt-1">
        {{ title }}
      </v-card-title>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      required: false,
      default() {
        return '';
      },
    },
  },
};
</script>
