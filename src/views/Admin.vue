<template>
  <div class="admin-wrapper">
    <div class="tab-wrapper">
      <div class="admin-layout" v-for="title in titles.titleCards" :key="title">
        <v-card @click.prevent="onCreateUser()">
          <v-card-title>{{ title }}</v-card-title>
        </v-card>
      </div>
    </div>
    <!-- // TODO: Сделать отправку формы-->
    <div class="admin-content">
      <v-window v-model="tab">
        <v-window-item v-if="models.user != null" :value="1">
          <form class="admin-form">
            <v-text-field
              class="ma-3 admin-field"
              color="indigo"
              v-for="textField in models.user.props"
              :key="textField"
              v-model="models.user[textField]"
              :counter="10"
              :label="textField"
              required
            ></v-text-field>
            <v-btn color="indigo" @click.prevent="onClickApplyUpdate()"
              >Создать пользователя</v-btn
            >
          </form>
        </v-window-item>
        <v-window-item :value="2"> Step 2</v-window-item>
      </v-window>
      <v-btn @click="next()">next</v-btn>
    </div>
  </div>
</template>

<script>
// import Form from '@/UI/Form'
// [01.07.2022] TODO: Сделать отправку данных формы после создания пользователя
import ModelUserCreate from '@/models/model.user.create';
export default {
  data() {
    return {
      tab: 0,
      titles: this.$store.getters['user/GET_SIDEBAR_LINKS_BY_ROLE'](
        'SUPERUSER'
      )[0],
      models: {
        user: null
      }
    };
  },
  methods: {
    onCreateUser() {
      console.warn('ADMIN.VUE: onCreateUser');
      this.models.user = new ModelUserCreate();
      this.tab = 1;
    },
    onClickApplyUpdate() {
      console.warn('ADMIN.VUE: onClickApplyUpdate');
      console.log(this.models.user);
    },
    next() {
      this.tab++;
      console.log(this.tab);
    }
  }
};
</script>
