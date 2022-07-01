<template>
  <v-app id="inspire">
    <form>
      <v-text-field
        v-model="model"
        :error-messages="nameErrors"
        :counter="10"
        label="Name"
        required
        @input="$v.name.$touch()"
        @blur="$v.name.$touch()"
      ></v-text-field>
      <v-btn class="mr-4" @click="submit">
        submit
      </v-btn>
      <v-btn @click="clear">
        clear
      </v-btn>
    </form>
  </v-app>
</template>

<script>
export default {
  data() {
    model:
  }
};
</script>
