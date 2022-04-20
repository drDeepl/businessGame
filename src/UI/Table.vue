<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col" v-for="title in titles" :key="title">{{ title }}</th>
        </tr>
      </thead>
      <tr v-for="(data, id) in dataArray" :key="id">
        <td v-for="dataTitle in Object.keys(titles)" :key="dataTitle">
          {{ data[dataTitle] }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// TODO: Настроить отображение таблиц
export default {
  props: {
    titles: {
      type: Object,
      required: true
    },
    dataArray: {
      type: Array,
      required: true
    }
  }
};
</script>
