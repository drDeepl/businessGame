<template>
  <div class="admin-wrapper">
    <v-card
      class="ma-3 pa-2 red-border"
      max-width="15rem"
      v-for="title in titles.titleCards"
      :key="title"
      :hover="true"
      rounded="lg"
    >
      <v-card-title class="text-h5 font-weight-bold">
        {{ title }}
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
// [30.06.2022] TODO: Найти способ изменить цвет радиуса в vuetify
// NOTE: Что, если сделать обвёртку над карточкой и для неё менять стили?
export default {
  data() {
    return {
      titles: this.$store.getters['user/GET_SIDEBAR_LINKS_BY_ROLE']('SUPERUSER')
    };
  }
};
</script>
