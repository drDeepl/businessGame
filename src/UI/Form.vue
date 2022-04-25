<template>
  <div class="form__wrapper">
    <!-- TODO: Добавить сбор данных с формы -->
    {{ selects }}
    <form>
      <div class="form-group">
        <input
          v-for="input in Object.keys(inputs)"
          :key="input"
          type="email"
          class="form-control"
          :id="input"
          :placeholder="inputs[input]"
        />
      </div>
      <div class="form-group">
        <label v-for="row in selects" :key="row.title" :for="row.title">
          {{ row.title }}
        </label>
        <select
          class="form-control"
          v-for="select in selects"
          :for="selects[select]"
          :key="select.title"
          id="form-select"
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
      <button class="btn" type="submit">Готово</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
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
  }
};
</script>
