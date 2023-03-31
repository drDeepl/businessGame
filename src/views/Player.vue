<template>
  <div>
    <div class="player-layout">
      <p>
        <span v-if="dataCurrentUser"
          >Привет, {{ dataCurrentUser.username }}</span
        >
        <v-skeleton-loader v-else type="list-item"></v-skeleton-loader>
      </p>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      render: {
        page: true,
      },
    };
  },
  async created() {
    this.render.page = true;
  },
  computed: {
    ...mapGetters({
      dataCurrentUser: 'user/GET_CURRENT_USER_DATA',
    }),
  },
};
</script>
