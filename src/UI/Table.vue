<template>
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
        @click.prevent="onClickTableButton(id, data)"
      >
        <td
          class="data-row"
          v-for="dataTitle in Object.keys(titles)"
          :key="dataTitle"
        >
          <span class="data-row">{{ data[dataTitle] }}</span>
        </td>
      </tr>
    </table>

    <div class="tab-action" v-if="tabAction.isActive">
      <button
        v-for="action in tabAction.actions"
        :key="action"
        class="admin-tab"
      >
        {{ action }}
      </button>
    </div>
  </div>
</template>

<script>
// TODO: Сделать переключение между формой в таблице
export default {
  data() {
    return {
      tabAction: {
        isActive: false,
        actions: ['Редактировать', 'Удалить']
      }
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
    }
  },
  methods: {
    onClickTableButton(data) {
      this.tabAction.isActive = !this.tabAction.isActive;
      this.tabAction.data = data;
    }
  }
};
</script>
