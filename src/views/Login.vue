<template>
  <v-container class="pa-5" id="login__container">
    <img id="login_logo" src="../assets/kmsu_logo.svg" />
    <v-form @submit.prevent="onLogIn">
      <v-row class="login-row">
        <v-text-field
          v-model.trim="form.username"
          :rules="rules"
          label="Имя пользователя"
          :error-messages="errorMessages"
          :succes-messages="succesMessages"
          successr-messages
          :color="styles.form.color"
          required
        ></v-text-field>
      </v-row>
      <v-row class="login-row">
        <v-text-field
          v-model.trim="form.password"
          label="Пароль"
          :error-messages="errorMessages"
          :succes-messages="succesMessages"
          required
          :rules="rules"
          :color="styles.form.color"
          type="password"
        ></v-text-field>
      </v-row>
      <v-btn
        class="login-btn"
        elevation="4"
        outlined
        :color="styles.form.color"
        type="submit"
        >Войти</v-btn
      >
    </v-form>
  </v-container>
</template>

<script>
import {validationMixin} from 'vuelidate';
import {required} from 'vuelidate/lib/validators';
import LoginForm from '@/models/model.login.form';
import {card} from '@/_config';
import User from '@/store/models/User';
export default {
  mixins: [validationMixin],
  data() {
    return {
      test: true,
      errorMessages: [],
      succesMessages: [],
      rules: [(value) => (value ? !!value : 'Поле не может быть пустым')],
      form: {
        username: '',
        password: '',
      },
      styles: {
        form: {
          color: card.color,
        },
      },
    };
  },
  validations: {
    form: {
      username: {required},
      password: {required},
    },
  },
  methods: {
    async onLogIn() {
      console.warn('Login.vue: onLogin');
      this.$v.form.$touch();
      if (this.$v.form.$error) {
        console.log('Login.vue: error validate');
      } else {
        console.log('Is Errors? ' + this.$v.form.$error);
        try {
          const user = new LoginForm(this.form);
          console.log(this.$store.state.auth.user);
          console.log('onLogin:' + this.$store.state.auth.status.loggedIn);
          const userToken = await this.$store.dispatch('auth/login', user);
          const username = userToken.username;
          console.error(username);

          const access = this.$store.getters['auth/initState'].user.access;
          console.warn(access);

          const response = await User.api().getUserByUsername(username);
          const userData = response.response.data;
          const role = userData.role.toLowerCase();
          this.$router.push('/' + role);
          console.log('After Login');
          console.log(this.$store.state.auth.status);
        } catch (e) {
          console.log('Login.vue: Error');
          console.error(e);
          this.errorMessages.push('Неправильный логин или пароль!');
        }
      }
    },
  },
};
</script>
