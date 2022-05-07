<template>
  <v-container class="pa-5" id="login__container">
    <img id="login_logo" src="../assets/kmsu_logo.svg" />
    <v-form>
      <v-row>
        <v-col cols="10" md="10">
          <v-text-field
            v-model="user.username"
            label="Имя пользователя"
            color="#6b4ee6"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="10" md="10">
          <v-text-field
            v-model="user.password"
            label="Пароль"
            required
            color="#6b4ee6"
            type="password"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-btn elevation="4" outlined color="#6b4ee6" @click.prevent="onLogIn"
        >Войти</v-btn
      >
    </v-form>
  </v-container>
</template>

<script>
import colors from '@/_config';
import User from '@/models/user';
// TODO: Настроить авторизацию
export default {
  data() {
    return {
      user: new User(),
      palette: colors
    };
  },
  methods: {
    onLogIn() {
      this.test = this.user;
    }
  }
};
</script>
