<template>
  <v-dialog
    v-model="activate"
    max-width="45%"
    @click.prevent="onClickCancelForm"
  >
    <v-form class="admin-form pt-2 pb-2">
      <div class="form-title">{{ title }}</div>
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
      <v-alert
        border="right"
        colored-border
        type="error"
        elevation="2"
        v-if="form.errors.length > 0"
        class="form-error-container"
        >Ошибки в следующий полях:
        <small
          class="form-error-text"
          v-for="message in form.errors"
          :key="message"
          >{{ message }}</small
        >
      </v-alert>
      <div class="admin-btn-form">
        <v-btn
          outlined
          color="#31c48d"
          rounded
          @click.prevent="onClickApplyForm()"
        >
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
import {formIsValid} from '@/helpers/helper.form';
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
    select: Object, // INFO: {key in model: items}
    parentFunction: Function,
    cancelForm: Function
  },
  data() {
    return {
      createModel: new Object(),
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
      const propsCreateModel = this.model.props;
      const resValidateForm = formIsValid(propsCreateModel, this.createModel);
      console.error(resValidateForm.length);
      if (resValidateForm.length == 0) {
        console.warn('FORM SUCCESS');
        return await this.parentFunction(this.createModel);
      } else {
        console.error("FORM IS'N SUCCESS");
        this.form.errors = resValidateForm;
      }
    },
    onClickCancelForm() {
      console.warn('FORM.vue: onClickCancelForm');
      this.createModel = new Object();
      this.form.errors = [];
      return this.cancelForm();
    }
  }
};
</script>
