<template>
  <v-form ref="createUser" class="admin-form pt-2 pb-2">
    <v-title-card class="ma-3">{{ title }}</v-title-card>
    <div v-for="textField in Object.keys(model.props)" :key="textField">
      <!-- // NOTE: Если свойство модели совпадает со свойством select -->
      <!-- // NOTE: То текстовое поле не отображается -->
      <v-text-field
        color="#6c63ff"
        v-if="Object.keys(select).indexOf(textField) < 0"
        class="pr-2 pl-2 ma-1 admin-field"
        v-model="createModel[textField]"
        :label="model.props[textField]"
        :rules="form.rules.field"
        required
      ></v-text-field>
      <div v-else>
        <v-select
          color="#6c63ff"
          class="pr-2 pl-2 ma-1"
          v-model="createModel[textField]"
          :items="select[textField]"
          :label="model.props[textField]"
          required
        >
        </v-select>
      </div>
    </div>
    <slot></slot>
    <div class="admin-btn-form">
      <v-btn
        outlined
        color="#31c48d"
        rounded
        @click.prevent="OnClickApplyForm()"
      >
        Подтвердить
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn outlined color="red" rounded @click.prevent="onClickCancelForm">
        Отмена
      </v-btn>
    </div>
  </v-form>
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
    title: String,
    model: Object,
    select: Object, // INFO: {key in model: items}
    parentFunction: Function,
    cancelForm: Function,
    titleForm: String
  },
  data() {
    return {
      createModel: new Object(),
      form: {
        rules: {
          field: [v => !!v || 'Поле не может быть пустым']
        }
      }
    };
  },

  methods: {
    OnClickApplyForm() {
      console.warn('FORM.vue: OnClickApplyForm');
      return this.parentFunction(this.createModel);
    },
    onClickCancelForm() {
      // [06.07.2022] TODO: Сделать закрытие формы
    }
  }
};
</script>
