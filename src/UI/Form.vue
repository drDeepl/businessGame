<template>
  <v-dialog
    v-model="activate"
    persistent
    width="25em"
    content-class="panel-tabs"
  >
    <v-form
      ref="form"
      class="admin-form pa-2"
      @submit.prevent="onClickApplyForm"
    >
      <div class="form-title">
        <span>{{ title }}</span>
      </div>

      <!-- INFO: Проверка на показ элементов -->
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
            class="pr-2 pl-2 ma-1"
            v-model="createdModel[textField]"
            :label="model.props[textField]"
            :rules="form.rules[model.ruleValidate[textField]]"
            required
          ></v-text-field>
        </div>
      </div>
      <v-alert v-if="errorsMessage.length > 0">
        <v-card-text class="ma-0 pa-0">Возникли следующие ошибки:</v-card-text>
        <ul class="form-errors-container">
          <li
            class="form-error-message"
            v-for="error in errorsMessage"
            :key="error"
          >
            <v-card-text class="mt-1 pa-0 form-error-text">
              {{ error }}
            </v-card-text>
          </li>
        </ul>
      </v-alert>
      <slot></slot>
      <div class="admin-btn-form">
        <v-btn
          outlined
          color="#31c48d"
          rounded
          :loading="load"
          @click="onClickApplyForm()"
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
    title: {
      type: String,
      default() {
        return '';
      },
    },

    model: Object,

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
        return {};
      },
    },
    load: {
      type: Boolean,
      default() {
        return false;
      },
    },
    errorsMessage: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      createdModel: Object.create(this.$props.model.data),
      form: {
        rules: {
          field: [(v) => !!v || 'Поле не может быть пустым'],
          email: [
            (v) => !!v || 'Поле не может быть пустым',
            (v) =>
              /.+@.+\..+/.test(v) || 'Неправильно указана электронная почта',
          ],

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
      if (!this.load) {
        console.warn('FORM.vue: OnClickApplyForm');
        console.warn(this.createdModel);
        const createdModel = this.createdModel;
        const typesModel = this.$props.model.types;
        const passed = Object.keys(this.$props.select);
        console.warn('PASSED\n', passed);
        if (this.$refs.form.validate()) {
          const preparedData = prepareTypes(createdModel, typesModel, passed);
          console.warn(preparedData);
          await this.parentFunction(preparedData);
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
        } else {
          console.error('FORM INVALID');
        }
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
