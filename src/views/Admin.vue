<template>
  <div class="admin-wrapper">
    <div class="tab-wrapper">
      <div class="admin-card-wrapper">
        <v-card
          class="admin-layout"
          v-for="objectTab in titles.titleCards"
          :key="objectTab.id"
          @click.prevent="onClickAdminTab(objectTab.id)"
        >
          <v-card-title class="text-caption">{{
            objectTab.value
          }}</v-card-title>
        </v-card>
      </div>
    </div>
    <!-- // TODO: Сделать отправку формы -->
    <div>
      <v-window class="admin-content" v-model="currentTab">
        <v-window-item v-if="models.modelCreateUser != null" :value="1">
          <form class="admin-form">
            <div
              v-for="textField in Object.keys(models.modelCreateUser.props)"
              :key="textField"
            >
              <v-text-field
                v-if="(textField != 'role') & (textField != 'team_id')"
                class="ma-3 admin-field"
                v-model="models.modelCreateUser[textField]"
                :counter="10"
                :label="models.modelCreateUser.props[textField]"
                required
              ></v-text-field>
              <v-select
                v-if="textField == 'role'"
                v-model="models.modelCreateUser[textField]"
                :items="arrays.usersRole"
                :label="models.modelCreateUser.props[textField]"
                required
              >
              </v-select>
              <v-select
                v-if="textField == 'team_id'"
                v-model="models.modelCreateUser[textField]"
                :items="arrays.listNamesTeams"
                :label="models.modelCreateUser.props[textField]"
                required
              >
                ></v-select
              >
            </div>
            <v-btn
              class="admin-btn-form"
              color="green light"
              @click.prevent="onClickCreateUser()"
            >
              <span class="admin-btn-form-text text-white"
                >Создать пользователя</span
              ></v-btn
            >
          </form>
        </v-window-item>
        <!-- INFO: Вкладка "список пользователей" -->
        <v-window-item :value="4">
          <!-- // NOTE: Какие о пользователи необходимо вывести? -->
          <!-- // NOTE: Нужно ли создавать отдельную модель для отображения данных? -->
          <!-- // NOTE: Что, если в модели пользователя сделать массив объектов {рассшифровка: название строки в } -->

          <v-card class="admin-row-user-card admin-header-users ma-2 pa-3">
            <span
              v-for="title in Object.keys(models.user.props)"
              :key="title"
              class="admin-header-user-text"
              >{{ models.user.props[title] }}</span
            >
          </v-card>
          <v-card
            class="admin-row-user-card ma-2 pa-3"
            v-for="user in arrays.users"
            :key="user.id"
          >
            <span
              class="admin-row-user-text"
              v-for="dataRow in Object.keys(user)"
              :key="dataRow"
              >{{ models.modelCreateUser.props[dataRow] }}</span
            >
            <v-btn class="admin-row-user-btn" outlined color="#31c48d" rounded
              >Редактировать</v-btn
            >
          </v-card>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script>
// import Form from '@/UI/Form'
import UserService from '@/services/user.service';
// [01.07.2022] TODO: Сделать отправку данных формы после создания пользователя
// [03.07.2022] TODO:  Сделать вывод существующих команд
// [03.07.2022] TODO: Сделать вывод всех пользователей
import ModelUserCreate from '@/models/model.user.create';
import User from '@/models/model.user';
export default {
  async mounted() {
    this.arrays.usersRole = await UserService.getRoles();
    await this.$store.dispatch('team/getTeams');
    const namesTeams = this.$store.getters['team/GET_LIST_NAMES_TEAMS'];
    this.arrays.listNamesTeams = namesTeams;
    let listUsers = this.$store.getters['user/GET_LIST_USERS'];
    if (!listUsers) {
      listUsers = await this.$store.dispatch('user/getUsers');
    }
    this.arrays.users = listUsers;
    console.log(listUsers);
  },
  data() {
    return {
      currentTab: 0,
      titles: this.$store.getters['user/GET_SIDEBAR_LINKS_BY_ROLE'](
        'SUPERUSER'
      )[0],
      models: {
        user: new User(),
        modelCreateUser: new ModelUserCreate()
      },
      arrays: {
        usersRole: null,
        listNamesTeams: null,
        users: null
      }
    };
  },
  methods: {
    // [04.07.2022] TODO: Добавить обновление БД с пользователями
    onClickAdminTab(id) {
      console.warn('ADMIN.VUE: onClickAdminTab');
      this.currentTab = id;
      console.log(id);
    },
    onClickCreateUser() {
      console.warn('ADMIN.VUE: onClickApplyUpdate');
      const team_id = this.$store.getters['team/GET_DATA_TEAM_BY_TeamName'](
        this.models.modelCreateUser.team_id
      ).id;
      this.models.modelCreateUser.team_id = team_id;
      console.error('TODO HERE!');
    }
  }
};
</script>
