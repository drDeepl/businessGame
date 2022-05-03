<template>
  <div class="table__wrapper">
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr class="head-table-row">
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
        <tr
          class="table-row"
          v-for="(data, id) in dataArray"
          :key="id"
          @click.prevent="onClickTable(data)"
        >
          <td
            class="data-row"
            v-for="dataTitle in Object.keys(titles)"
            :key="dataTitle"
          >
            <span class="data-row">
              {{ data[dataTitle] }}
            </span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickRow: false
    };
  },
  props: {
    titles: {
      type: Object,
      required: true
    },
    dataArray: {
      type: Array,
      required: true
    },
    onClickTableRow: Function
  },
  computed: {
    isActiveClick() {
      return this.clickRow;
    }
  },
  methods: {
    onClickTable(data) {
      this.clickRow = !this.clickRow;
      this.onClickTableRow({
        data: data
      });
    }
  }
};
</script>
