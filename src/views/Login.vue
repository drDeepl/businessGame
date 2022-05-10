<template>
  <v-container class="pa-5" id="login__container">
    <img id="login_logo" src="../assets/kmsu_logo.svg" />
    <v-form>
      <v-row class="login-row">
        <v-text-field
          v-model="user.username"
          label="Имя пользователя"
          color="#6b4ee6"
          required
        ></v-text-field>
      </v-row>
      <v-row class="login-row">
        <v-text-field
          v-model="user.password"
          label="Пароль"
          required
          color="#6b4ee6"
          type="password"
        ></v-text-field>
      </v-row>
      <v-btn
        class="login-btn"
        elevation="4"
        outlined
        color="#6b4ee6"
        @click.prevent="onLogIn"
        >Войти</v-btn
      >
    </v-form>
    {{ test }}
    <v-alert
      class="login-alert"
      v-if="authErrors.length"
      dense
      elevation="5"
      outlined
      type="error"
    >
      {{ authErrors[0] }}
    </v-alert>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex';
import User from '@/models/user';
// TODO: Настроить валидацию и авторизацию
export default {
  data() {
    return {
      authErrors: [],
      test: '',
      user: new User()
    };
  },
  computed: {
    ...mapGetters(['auth/initState'])
  },
  methods: {
    async onLogIn() {
      try {
        this.test = await this.$store.dispatch('auth/login', this.user);
      } catch {
        this.authErrors.push('Неверный логин или пароль');
      }
      console.log(this.initState);
    }
  }
};
</script>
