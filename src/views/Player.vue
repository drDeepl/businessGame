<template>
  <div>
    <div class="player-layout">
      <p>Привет, {{ dataCurrentUser.username }}</p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      dataCurrentUser: 'user/GET_DATA_CURRENT_USER',
    }),
  },
};
</script>
