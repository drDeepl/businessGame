<template>
  <div class="form__wrapper">
    <!-- TODO: Добавить сбор данных с формы -->
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <input
          v-for="inputProp in Object.keys(input)"
          :key="inputProp"
          required
          class="form-control"
          :id="inputProp"
          :placeholder="input[inputProp]"
          v-model="dataForm[inputProp]"
        />
        {{ dataForm }}
      </div>
      <div class="form-group">
        <label v-for="row in selects" :key="row.title">
          {{ row.title }}
        </label>
        <select
          class="form-control"
          v-for="select in selects"
          :key="select.id"
          id="form-select"
          v-model="dataForm[select.id]"
        >
          <option
            class="form-option"
            v-for="option in Object.keys(select.options)"
            :key="option"
          >
            {{ select.options[option] }}
          </option>
        </select>
      </div>
      <button class="form-btn" type="submit">Готово</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: {
        // {input: placehole}
      },
      dataForm: {}
    };
  },
  props: {
    onSubmitForm: {
      type: Function
    },
    inputs: {
      // {
      //     "id"(string): "title(string)"
      // }
      type: Object,
      required: true
    },
    selects: {
      // [
      //  {
      //     title: string,
      //     optins: array
      // }
      //]
      type: Array
    }
  },
  arrayOptions: {
    type: Array
  },
  computed: {
    inputRole() {
      return this.input;
    }
  },
  methods: {
    onSubmit() {
      this.onSubmitForm({dataForm: this.dataForm});
    }
  },
  mounted() {
    let tmpInput = Object();
    const inputsId = Object.keys(this.inputs);
    for (let inputId in inputsId) {
      let propInput = inputsId[inputId];
      tmpInput[propInput] = this.inputs[propInput];
    }
    console.log(tmpInput);
    this.input = tmpInput;
  }
};
</script>
