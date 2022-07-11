<template>
  <v-dialog v-model="activate" persistent>
    <v-form class="admin-form pt-2 pb-2">
      <div class="form-title">{{ title }}</div>
      <div v-for="textField in Object.keys(model.props)" :key="textField">
        <!-- // NOTE: Если свойство модели совпадает со свойством select -->
        <!-- // NOTE: То текстовое поле не отображается -->
        <v-text-field
          color="#6c63ff"
          v-if="Object.keys(select).indexOf(textField) < 0"
          class="pr-2 pl-2 ma-1 admin-field"
          v-model="createdModel[textField]"
          :label="model.props[textField]"
          :rules="form.rules.field"
          :hint="'Предыдущее значение ' + values[textField]"
          required
        ></v-text-field>
        <div v-else>
          <v-select
            color="#6c63ff"
            class="pr-2 pl-2 ma-1"
            v-model="createdModel[textField]"
            :items="select[textField]"
            :label="model.props[textField]"
            required
          >
          </v-select>
        </div>
      </div>

      <slot></slot>
      <div class="admin-btn-form">
        <v-btn outlined color="#31c48d" rounded @click="onClickApplyForm()">
          Подтвердить
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn outlined color="red" rounded @click.prevent="onClickCancelForm">
          Отмена
        </v-btn>
      </div>
    </v-form>
  </v-dialog>
</template>

<script>
export default {
  // NOTE: Данная форма будет принимать модель типа
  // NOTE: NameModel  { titleProps: {
  // NOTE:              property: translate property
  // NOTE:              }
  // NOTE:            }
  // INFO: Форма будет принимать модель, заполнять её данными
  // INFO: А после отправлять родителю
  props: {
    activate: {type: Boolean},
    title: String,
    titleForm: String,
    model: Object,
    values: {
      type: Object,
      default() {
        return {};
      }
    },
    select: {
      types: Object,
      default() {
        return {};
      }
    }, // INFO: {key in model: items}
    parentFunction: Function,
    cancelForm: Function,
    types: Object // NOTE: {Название ключа модели : Тип}
  },
  data() {
    return {
      createdModel: new Object(),
      form: {
        rules: {
          field: [v => !!v || 'Поле не может быть пустым']
        },
        errors: []
      }
    };
  },

  methods: {
    async onClickApplyForm() {
      // [07.07.2022] TODO: Решить ошибку выполнения
      console.warn('FORM.vue: OnClickApplyForm');
      console.warn(this.createdModel);
      return this.parentFunction(this.createdModel);
    },
    onClickCancelForm() {
      console.warn('FORM.vue: onClickCancelForm');
      this.createdModel = new Object();
      this.form.errors = [];
      return this.cancelForm();
    }
  }
};
</script>
