<template>
  <div class="productKits-container">
    <v-card v-for="key in Object.keys(item)" :key="key">
      <v-card-text v-if="dictDecode[key]">
        {{ getProductNameById(item[key]) }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    // INFO: в модели объекта находиться свойства с заголовками для отображения
    modelitem: Object,
    item: Object,
    // INFO: dicDecode есть словарь с названиями полей,
    // INFO: которые необходимо расшифровать через обращение к базе данных
    // INFO: например, product_id => product_name
    dictDecode: Object,
  },
  computed: {
    getProductNameById() {
      return (obj) => {
        return this.$store
          .$db()
          .model('products')
          .query()
          .where('id', obj.value)
          .get();
      };
    },
  },
};
</script>
