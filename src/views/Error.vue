<template>
  <div>
    <v-card class="ma-2" v-for="item_id in items" :key="item_id">
      <v-card-title>
        {{ item_id }}
      </v-card-title>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Ошибки в проекте',
      items: {
        0: 'ошибка 500 при создании команды',
        1: 'ошибка 500 при удалении продукта',
        2: 'созданный пользователь через API имеет account: null',
        3: 'к списку продуктовых наборов команды имеет доступ только админ',
      },
    };
  },
};
</script>
