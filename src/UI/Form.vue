<template>
  <v-dialog v-model="activate" persistent>
    <v-form ref="form" class="admin-form pt-2 pb-2" @>
      <div class="form-title">{{ title }}</div>
      <div v-for="textField in Object.keys(model.props)" :key="textField">
        <!-- // NOTE: Если свойство модели совпадает со свойством select -->
        <!-- // NOTE: То текстовое поле не отображается -->
        <div v-if="Object.keys(select).indexOf(textField) >= 0">
          <v-select
            v-if="!disableFields.hasOwnProperty(textField)"
            color="#6c63ff"
            class="pr-2 pl-2 ma-1"
            v-model="createdModel[textField]"
            :items="select[textField]"
            :label="model.props[textField]"
            :rules="form.rules.field"
          >
          </v-select>
        </div>
        <div v-else>
          <v-text-field
            v-if="!disableFields.hasOwnProperty(textField)"
            color="#6c63ff"
            class="pr-2 pl-2 ma-1 admin-field"
            v-model="createdModel[textField]"
            :label="model.props[textField]"
            :rules="form.rules[model.ruleValidate[textField]]"
            required
          ></v-text-field>
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
import {prepareTypes} from '@/helpers/helper.form';
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
    // TODO: выбор значения для поля
    values: {
      type: Object,
      default() {
        return {};
      },
    },
    applySucces: Boolean,
    select: {
      // NOTE: {textField: {label: string, value: string}}
      types: Object,
      default() {
        return {};
      },
    },
    parentFunction: Function,
    cancelForm: Function,
    disableFields: {
      // NOTE: {key: boolean}
      type: Object,
      default() {
        // FIX создать прототип класса со значениями false
        return {};
      },
    },
  },
  data() {
    return {
      createdModel: Object.create(this.$props.model.data),
      form: {
        // NOTE: Что, если правила проверки будут зависеть от типа данных в модели?
        rules: {
          field: [(v) => !!v || 'Поле не может быть пустым'],
          email: [
            (v) => !!v || 'Поле не может быть пустым',
            (v) =>
              /.+@.+\..+/.test(v) || 'Неправильно указана электронная почта',
          ],
          // TODO: Добавить проверку поля на число
          number: [
            (v) => !!v || 'Поле не может быть пустым',
            (v) => /^[0-9]+$/.test(v) || 'Поле может состоять только из цифр',
          ],
        },
        errors: [],
      },
    };
  },
  watch: {
    applySucces(value) {
      console.warn('FORM.VUE: watch succes validate');
      if (value) {
        this.$refs.form.reset();
      }
    },
  },
  methods: {
    async onClickApplyForm() {
      console.warn('FORM.vue: OnClickApplyForm');
      console.warn(this.createdModel);
      const createdModel = this.createdModel;
      const typesModel = this.$props.model.types;
      const passed = Object.keys(this.$props.select);
      if (this.$refs.form.validate()) {
        const preparedData = prepareTypes(createdModel, typesModel, passed);
        console.warn(preparedData);
        await this.parentFunction(preparedData);
        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      } else {
        console.error('FORM INVALID');
      }
    },
    onClickCancelForm() {
      console.warn('FORM.vue: onClickCancelForm');
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
      return this.cancelForm();
    },
    onClickSelect(textField) {
      console.warn('FORM.VUE: onClickSelect');
      console.error(textField);
    },
  },
};
</script>
