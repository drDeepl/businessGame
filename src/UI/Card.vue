<template>
  <div class="card">
    <div class="profile-info">
      <span class="card-name">{{ username }}</span>
      <span>{{ id }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  }
};
</script>
