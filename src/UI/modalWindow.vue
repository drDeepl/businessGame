<template>
  <div class="modal-window__wrapper">
    <div class="modal-window">
      <h1>{{ title }}</h1>
      <button class="btn-close">X</button>
      <div class="overlay"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true
    }
  }
};
</script>
