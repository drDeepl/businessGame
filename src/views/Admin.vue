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
            <div
              v-for="textField in Object.keys(models.user.props)"
              :key="models.user.props[textField]"
            >
              <v-text-field
                v-if="models.user.props[textField] != 'role'"
                class="ma-3 admin-field"
                color="indigo"
                v-model="models.user[textField]"
                :counter="10"
                :label="textField"
                required
              ></v-text-field>
              <v-select
                v-if="models.user.props[textField] == 'role'"
                v-model="models.user[textField]"
                :items="models.usersRole"
                :label="textField"
                required
              >
              </v-select>
            </div>
            <v-btn
              class="admin-btn-form"
              color="green light"
              @click.prevent="onClickApplyUpdate()"
            >
              <span class="admin-btn-form-text text-white"
                >Создать пользователя</span
              ></v-btn
            >
          </form>
        </v-window-item>
        <v-window-item :value="2"> Step 2</v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script>
// import Form from '@/UI/Form'
import UserService from '@/services/user.service';
import TeamService from '@/services/team.service';
// [01.07.2022] TODO: Сделать отправку данных формы после создания пользователя
// [03.07.2022] TODO:  Сделать вывод существующих команд
import ModelUserCreate from '@/models/model.user.create';
export default {
  async created() {
    this.models.usersRole = await UserService.getRoles();
    this.models.listTeams = await TeamService.getTeams();
    console.log(this.models.listTeams);
  },
  data() {
    return {
      tab: 0,
      titles: this.$store.getters['user/GET_SIDEBAR_LINKS_BY_ROLE'](
        'SUPERUSER'
      )[0],
      models: {
        user: null,
        usersRole: null,
        listTeams: null
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
