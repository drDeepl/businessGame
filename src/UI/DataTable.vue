<template>
  <div>
    <Load v-if="render" />

    <v-simple-table v-else>
      <template v-slot:default>
        <thead>
          <tr>
            <th v-if="haveDeleteFunc">
              <span>Действие</span>
            </th>
            <th
              v-for="title in headers.filter((title) => !hideColumns[title])"
              :key="title"
            >
              <span>
                {{ modelItem.titleProps[title] }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td v-if="haveDeleteFunc">
              <v-btn
                color="red lighten-1"
                icon
                @click.prevent="onClickDelete(item)"
                ><delete-icon></delete-icon
              ></v-btn>
            </td>
            <td v-for="property in headers" :key="property">
              <span>
                {{ item[property] }}
              </span>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import Load from '@/UI/Load.vue';
export default {
  components: {
    Load,
  },
  created() {
    this.render = true;

    try {
      const headers = this.modelItem.props.filter(
        (item) => !this.modelItem.hideShow[item]
      );
      this.headers = headers;
    } catch {
      this.headers = this.modelItem.props.filter(
        (item) => item.toLowerCase() != 'id'
      );
    }

    this.render = false;
  },

  props: {
    items: {type: Array, required: true},
    modelItem: {type: Object, required: true},
    haveDeleteFunc: {
      type: Boolean,
      required: false,
      default() {
        return false;
      },
    },
    hideColumns: {
      type: Object,
      required: false,
      default() {
        return {};
      },
    },
    onClickDeleteItem: {type: Function, required: false},
  },
  data() {
    return {
      render: false,
      headers: [],
    };
  },
  methods: {
    async onClickDelete(itemId) {
      await this.onClickDeleteItem(itemId);
    },
  },
};
</script>
