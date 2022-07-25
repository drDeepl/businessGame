<template>
  <div>
    <v-progress-circular
      :rotate="360"
      :size="100"
      :width="15"
      :value="value"
      color="teal"
    >
    </v-progress-circular>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
    };
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
