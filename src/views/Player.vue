<template>
  <div>
    Добро пожаловать на страницу Игрока
    <div>{{ dataCurrentUser }}</div>
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
