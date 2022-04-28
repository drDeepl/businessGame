<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr class="table-row">
          <th
            class="table-head"
            scope="col"
            v-for="title in titles"
            :key="title"
          >
            {{ title }}
          </th>
        </tr>
      </thead>
      <tr class="table-row" v-for="(data, id) in dataArray" :key="id">
        <td
          class="data-row"
          v-for="dataTitle in Object.keys(titles)"
          :key="dataTitle"
        >
          <span class="data-row">{{ data[dataTitle] }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
// TODO: props не видит массив
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
