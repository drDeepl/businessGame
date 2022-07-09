<template>
  <div class="admin-wrapper">
    <div class=" tab-wrapper">
      <div class="admin-card-wrapper">
        <v-tabs
          next-icon="mdi-arrow-right-bold-box-outline"
          prev-icon="mdi-arrow-left-bold-box-outline"
          show-arrows
        >
          <v-tab
            v-for="objectTab in titles.titleTabs"
            :key="objectTab.form"
            @click.prevent="onClickAdminTab(objectTab.form, objectTab.title)"
          >
            {{ objectTab.title }}
          </v-tab>
          <!-- // INFO: Форма создания пользователя -->
          <v-tab-item>
            <Form
              :activate="forms.formCreateUser.active"
              :title="titleCurrentForm"
              :model="forms.formCreateUser.model"
              :select="{role: arrays.role, team_id: arrays.team}"
              :cancelForm="onClickCancelForm"
              :parentFunction="onClickCreateUser"
            >
            </Form>
          </v-tab-item>
          <!-- // INFO: Форма создания команды -->
          <v-tab-item>
            <Form
              :activate="forms.formCreateTeam.active"
              :title="titleCurrentForm"
              :model="forms.formCreateTeam.model"
              :types="forms.formCreateTeam.model.types"
              :cancelForm="onClickCancelForm"
              :parentFunction="onClickCreateTeam"
            >
            </Form>
          </v-tab-item>
          <!-- // INFO: Форма создания счета команды -->
          <v-tab-item>
            <Form
              :activate="forms.formCreateUser.active"
              :title="titleCurrentForm"
              :model="forms.formCreateUser.model"
              :select="{role: arrays.role, team_id: arrays.team}"
              :cancelForm="onClickCancelForm"
              :parentFunction="onClickCreateUser"
            >
            </Form>
          </v-tab-item>
          <!-- // INFO: Список пользователей -->
          <v-tab-item>
            <div class="admin-list-users-wrapper">
              <v-card class="ma-1 pa-1 admin-row-user-card list-users-header">
                <span
                  class="admin-users-text"
                  v-for="title in Object.keys(listUsersHeaders)"
                  :key="title"
                >
                  {{ models.user.titleProps[title] }}</span
                >
              </v-card>
              <v-card
                class="admin-row-user-card ma-2 pa-3 admin-users-text"
                v-for="user in arrays.users"
                :key="user.id"
              >
                <span
                  class="admin-users-text"
                  v-for="titleProperty in Object.keys(listUsersHeaders)"
                  :key="titleProperty"
                  >{{ user[titleProperty] }}
                </span>

                <v-btn
                  class="admin-row-user-btn"
                  outlined
                  color="#31c48d"
                  rounded
                  @click.prevent="onClickEditUser(user)"
                  >Редактировать</v-btn
                >
              </v-card>

              <Form
                :activate="forms.formUpdateUser.active"
                :title="titleCurrentForm"
                :model="forms.formUpdateUser.model"
                :select="{role: arrays.role, team_id: arrays.team}"
                :parentFunction="onClickUpdateUser"
                :cancelForm="onClickCancelForm"
              >
              </Form>
            </div>
          </v-tab-item>
        </v-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/user.service';
import {createRandomUser} from '@/helpers/helper.fake';
// [06.07.2022] TODO:  Сделать вывод существующих команд
// [07.07.2022] TODO: создание команды
// [07.07.2022] TODO: создание счета для команды
// [06.07.2022] TODO: Сделать отправку запроса на изменение пользователя
import ModelUserCreate from '@/models/model.user.create';
import ModelUpdateUser from '@/models/model.user.update';
import ModelCreateTeam from '@/models/model.team.create';
import User from '@/models/model.user';
import Form from '@/UI/Form.vue';
export default {
  async created() {
    this.arrays.role = await UserService.getRoles();
    await this.$store.dispatch('team/getTeams');
    const JSON_namesTeams = this.$store.getters['team/GET_LIST_NAMES_TEAMS'];
    const listNamesTeams = Object.keys(JSON_namesTeams);
    this.arrays.team = listNamesTeams;
    await this.$store.dispatch('user/getUsers');
    let listUsers = this.$store.getters['user/GET_LIST_USERS'];
    this.arrays.users = listUsers;
    console.log(listUsers);
  },
  data() {
    return {
      titleCurrentForm: '',
      currentForm: '',
      titles: this.$store.getters['user/GET_SIDEBAR_LINKS_BY_ROLE'](
        'SUPERUSER'
      )[0],
      models: {
        user: new User(),
        modelCreateUser: new ModelUserCreate(),
        modelUpdateUser: new ModelUpdateUser()
      },
      arrays: {
        role: null,
        team: null, // INFO: {nameTeam: data team}
        users: null
      },

      forms: {
        formActive: '', // INFO: titleTab из onClickAdminTab
        formCreateUser: {
          active: false,
          model: new ModelUserCreate(),
          select: {
            role: [],
            team_id: this.$store.getters['team/GET_LIST_NAMES_TEAMS']
          }
        },
        formUpdateUser: {
          active: false,
          model: new ModelUpdateUser(),
          select: {role: [], team_id: []},
          dataUser: null
        },
        formCreateTeam: {
          active: false,
          model: new ModelCreateTeam(),
          errors: []
        },
        formCreateAccountTeam: {
          active: false,
          model: {}
        }
      },
      // INFO: listUsersHeader отображает данные,
      // INFO: которые покажутся на внешней стороне карточки
      listUsersHeaders: {id: true, username: true, role: true, team: true}
    };
  },

  methods: {
    onClickAdminTab(formTitle, titleTab) {
      console.warn('ADMIN.VUE: onClickAdminTab');
      console.error(formTitle, titleTab);
      this.currentForm = formTitle;
      this.forms.formActive = formTitle;
      this.titleCurrentForm = titleTab;

      if (formTitle != null) {
        this.forms[formTitle].active = true;
      }
    },
    onClickCancelForm() {
      const activeForm = this.forms.formActive;
      this.forms[activeForm].active = false;
    },
    async onClickCreateUser(modelCreateUser) {
      console.warn('ADMIN.VUE: onClickCreateUser');
      const team_id = this.$store.getters['team/GET_DATA_TEAM_BY_TeamName'](
        modelCreateUser.team_id
      ).id;
      const newUser = modelCreateUser;
      newUser.team_id = team_id;
      console.error('NEW USER\n', newUser);
      await this.$store.dispatch('user/createUser', newUser);
    },
    async onClickCreateTeam(model) {
      console.warn('ADMIN.vue: onCLickCretaeTeam');
      console.error(model);
      await this.$store.dispatch('team/createTeam', model);
    },
    onClickEditUser(user) {
      console.warn('Admin.vue: onClickEditUser');
      console.error('USER FROM ROW:\n', user);
      this.forms.formUpdateUser.dataUser = user;
      this.titleCurrentForm = 'Редактирование пользователя';
      this.forms.formActive = 'formUpdateUser';
      this.forms.formUpdateUser.active = true;
    },
    async onClickUpdateUser(updatedDataUser) {
      // [07.07.2022] TODO: Сделать функцию обновления даных пользователя
      console.warn('ADMIN.vue: onClickUpdateUser');
      console.error(updatedDataUser);
      // console.error(user);
      // let dataForUpdateUser = {userId: user.id, data: user};
      // console.error(dataForUpdateUser);
      // await this.$store.dispatch('user/updateUser', dataForUpdateUser);
      // await this.$store.dispatch('user/getUsers');
    },
    // onCancelEditUser() {
    //   this.forms.formUpdateUser.active = false;
    // },
    onClickAutoCreateUser() {
      const newModel = createRandomUser(this.models.modelCreateUser);
      this.models.modelCreateUser = newModel;
    }
  },
  components: {
    Form
  }
};
</script>
