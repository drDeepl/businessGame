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
          id="show-modal"
          class="table-row"
          v-for="(data, id) in dataArray"
          :key="id"
          @click.prevent="onClickTableButton(data)"
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
    <modal v-if="modalWindow.showModal" @close="modalWindow.showModal = false">
      <modalWindow :title="title" />
    </modal>
  </div>
</template>

<script>
import modalWindow from '@/UI/modalWindow';
// TODO: Сделать переключение между формой в таблице
export default {
  data() {
    return {
      modalWindow: {
        showModal: false,
        title: '',
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
    onClickTableButton() {
      this.modalWindow.showModal = !this.modalWindow.showModal;
    }
  },
  components: {modalWindow}
};
</script>
