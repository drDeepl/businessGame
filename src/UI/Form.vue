<template>
  <div class="form__wrapper">
    <!-- <div>
      {{ data }}
    </div>
    <hr />
    <div>
      {{ labels }}
    </div> -->
    <form class="form-container">
      <div class="mb-3" v-for="dataKey in Object.keys(data)" :key="dataKey">
        <div class="form-rows" v-if="dataKey !== 'id'">
          <label :for="dataKey" class="form-label">{{ labels[dataKey] }}</label>
          <input
            type="email"
            class="form-control form-input"
            :id="dataKey"
            :placeholder="data[dataKey]"
          />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  //TODO: Сделать получение данных из формы
  //TODO: Сделать чтение данных из формы в computed
  props: {
    data: {
      type: Object,
      require: true
    },
    labels: {
      // data key is key in labels
      type: Object,
      require: true
    }
  }
};
</script>
