<template>
  <div class="admin-wrapper">
    <div class="tab-wrapper">
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
              :select="{role: arrays.role, team_id: teamNames}"
              :disableFields="{team_id: true}"
              :cancelForm="onClickCancelForm"
              :parentFunction="onClickCreateUser"
            >
              <div v-if="forms.formCreateUser.model.data.role">
                <v-select
                  v-if="
                    forms.formCreateUser.model.data.role.toLowerCase() ==
                    'player'
                  "
                  color="#6c63ff"
                  class="pr-2 pl-2 ma-1"
                  v-model="forms.formCreateUser.model.data.team_id"
                  :items="teamNames"
                  :label="forms.formCreateUser.model.props.team_id"
                  :rules="[(v) => !!v || 'Поле не может быть пустым']"
                >
                </v-select>
              </div>

              <v-btn class="ma-2" outlined color="orange" @click="fakeUser"
                >Фейк пользователь</v-btn
              >
              <div>{{ forms.formCreateUser.model.data }}</div>
              <v-alert
                border="right"
                colored-border
                type="error"
                elevation="2"
                v-if="forms.formCreateUser.errors.length > 0"
                class="form-error-container"
                >Упс...
                <small
                  class="form-error-text"
                  v-for="message in forms.formCreateUser.errors"
                  :key="message"
                  >{{ forms.formCreateUser.model.props[message] }}</small
                >
              </v-alert>
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
              <v-alert
                border="right"
                colored-border
                type="error"
                elevation="2"
                v-if="forms.formCreateTeam.errors.length > 0"
                class="form-error-container"
                >Ошибки в следующий полях:
                <small
                  class="form-error-text"
                  v-for="message in forms.formCreateTeam.errors"
                  :key="message"
                  >{{ forms.formCreateTeam.model.props[message] }}</small
                >
              </v-alert>
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
            <v-progress-circular
              class="manufacturer-layout"
              indeterminate
              size="64"
              v-if="arrays.users == null || arrays.users == undefined"
            ></v-progress-circular>
            <div v-else class="admin-list-users-wrapper">
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
                v-for="user in users"
                :key="user.username"
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
                  @click.prevent="onClickUpdateUser(user)"
                  >Редактировать</v-btn
                >

                <v-btn
                  class="ml-1 mr-0 mt-0 mb-0 pa-0"
                  outlined
                  color="red"
                  rounded
                  @click="onClickDeleteUser(user)"
                  ><delete-icon
                /></v-btn>
              </v-card>

              <Form
                :activate="forms.formUpdateUser.active"
                :title="titleCurrentForm"
                :model="forms.formUpdateUser.model"
                :select="{role: arrays.role, team_id: teamNames}"
                :parentFunction="onClickApplyUpdateUser"
                :values="forms.formUpdateUser.values"
                :cancelForm="onClickCancelForm"
              >
                <v-alert
                  border="right"
                  colored-border
                  type="error"
                  elevation="2"
                  v-if="forms.formUpdateUser.errors.length > 0"
                  class="form-error-container"
                  >Ошибки в следующий полях:
                  <small
                    class="form-error-text"
                    v-for="message in forms.formUpdateUser.errors"
                    :key="message"
                    >{{ forms.formUpdateUser.model.props[message] }}</small
                  >
                </v-alert>
              </Form>
            </div>
          </v-tab-item>
        </v-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Form from '@/UI/Form.vue';
import {codeErrorResponse} from '@/helpers/helper.error';
import {createRandomUser} from '@/helpers/helper.fake';
import ModelUserCreate from '@/models/model.user.create';
import ModelUpdateUser from '@/models/model.user.update';
import ModelCreateTeam from '@/models/model.team.create';
import ModelUser from '@/models/model.user';
import UserService from '@/services/user.service';

import User from '@/store/models/User';
import Team from '@/store/models/Team';

export default {
  data() {
    return {
      titleCurrentForm: '',
      currentForm: '',
      loading: {
        users: true,
      },
      titles:
        this.$store.getters['user/GET_SIDEBAR_LINKS_BY_ROLE']('SUPERUSER')[0],
      models: {
        user: new ModelUser(),
        modelCreateUser: new ModelUserCreate(),
        modelUpdateUser: new ModelUpdateUser(),
      },
      arrays: {
        role: null,
        teams: null, // INFO: {nameTeam: data team}
        users: null,
      },

      forms: {
        formActive: '', // INFO: titleTab из onClickAdminTab
        formCreateUser: {
          active: false,
          model: new ModelUserCreate(),
          modelToValidate: null,
          select: {
            role: [],
            team_id: this.$store.getters['team/GET_LIST_NAMES_TEAMS'],
          },
          errors: [],
        },
        formUpdateUser: {
          active: false,
          model: new ModelUpdateUser(),
          modelToValidate: null,
          select: {role: [], team_id: []},
          values: {}, // INFO: value хранит информацию о пользователе для подстановки в форму
          selectedUser: null,
          errors: [],
        },
        formCreateTeam: {
          active: false,
          model: new ModelCreateTeam(),
          errors: [],
          modelToValidate: null,
        },
        formCreateAccountTeam: {
          active: false,
          model: {},
        },
      },
      // INFO: listUsersHeader отображает данные,
      // INFO: которые покажутся на внешней стороне карточки
      listUsersHeaders: {
        id: true,
        username: true,
        role: true,
        team: true,
        account: true,
      },
    };
  },
  async created() {
    console.warn('ADMIN.VUE: created');
    const currentUser = this.$store.state.auth.user;
    const username = currentUser.username;
    console.error(username);
    const userData = await User.api().getUserByUsername(username);
    // await this.$store.dispatch('user/getUserDataByUsName', username);
    // const userData =
    //   this.$store.getters['user/GET_USER_INFO_BY_USERNAME'](username);
    // FIX: удалить после исправления ошибок
    userData.is_superuser = true;
    // FIX: ================================
    if (!userData.is_superuser) {
      this.$router.push('/');
    } else {
      this.arrays.role = await UserService.getRoles();

      const listTeams = await Team.api().getListTeams();

      let listUsers = await User.api().getListUsers();
      console.warn(listTeams.response.data);
      this.arrays.users = listUsers.response.data;
      this.arrays.teams = listTeams.response.data;
    }
  },
  computed: {
    teamNames() {
      let listTeams = this.$store.$db().model('teams').query().all();
      let namesTeam = listTeams.map((team) => team.name);
      return namesTeam;
    },
    users() {
      return this.$store.$db().model('users').query().all();
    },
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
      this.forms[activeForm].errors = [];
    },
    async onClickCreateUser(modelCreateUser) {
      console.warn('ADMIN.VUE: onClickCreateUser');
      console.warn(modelCreateUser);
      this.forms.formCreateUser.errors = [];
      // INFO: modelCreateUser содержит данные из формы
      // INFO: Функция выполняет валидацию данных, полученных из формы
      // INFO: А после показывает ошибки либо отправляет данные на сервер
      console.warn(modelCreateUser);
      if (modelCreateUser.role.toLowerCase() == 'player') {
        const team = this.$store
          .$db()
          .model('teams')
          .query()
          .where('name', modelCreateUser['team_id'])
          .first();
        console.warn('TEAM\n', team);
        if (team) {
          const team_id = team.id;
          modelCreateUser['team_id'] = team_id;
        } else {
          console.error('TEAM IS NULL');
        }
      }

      console.error('NEW USER\n', modelCreateUser);
      // FIX: Обработка ошибки при создании пользователя с существующим username
      try {
        const user = await User.api().createUser(modelCreateUser);
        console.error(user.response.data);
        const listUsers = this.$store.$db().model('users').query().all();
        this.arrays.users = listUsers;
      } catch (e) {
        const errorCode = codeErrorResponse(e);
        if (errorCode == 422) {
          this.forms.formCreateUser.errors = [
            'Имя пользователя уже существует',
          ];
        }
      }
    },
    async onClickCreateTeam(modelCreateTeam) {
      console.warn('ADMIN.VUE: onClickCreateTeam');
      console.error(modelCreateTeam);
      const createdTeam = await Team.api().createTeam(modelCreateTeam);
      console.error(createdTeam);
      await User.api().getListUsers();
    },
    onClickUpdateUser(user) {
      console.warn('Admin.vue: onClickUpdateUser');
      console.error('USER FROM ROW:\n', user);

      this.$store.dispatch('user/userToUpdate', user.id);
      this.forms.formUpdateUser.selectedUser = user;
      this.titleCurrentForm = 'Редактирование пользователя';
      this.forms.formActive = 'formUpdateUser';
      this.forms.formUpdateUser.active = true;
    },
    async onClickApplyUpdateUser(modelUpdateUser) {
      this.forms.formCreateUser.erros = [];
      // [07.07.2022] TODO: Сделать функцию обновления даных пользователя
      console.warn('ADMIN.vue: onClickUpdateUser');
      console.error(modelUpdateUser);
      const team = this.$store
        .$db()
        .model('teams')
        .query()
        .where('name', modelUpdateUser.team_id)
        .first();
      const teamId = team.id;
      modelUpdateUser.team_id = teamId;
      const userUpdateId = this.$store.getters['user/GET_USER_ID_UPDATE'];
      this.$store.dispatch('user/stateUpdatedUser', userUpdateId);
      console.error(userUpdateId, modelUpdateUser);
      await User.api().updateUser(userUpdateId, modelUpdateUser);

      // if (responseOrError.error) {
      //   console.warn('ERROR USER 422');
      //   this.forms.formCreateUser.errors.push(responseOrError.error);
      // } else {
      //   const listUsers = this.$store.$db().model('users').query().all();
      //   this.arrays.users = listUsers;
      //   this.arrays.users.reverse();
      // }
    },

    async onClickDeleteUser(user) {
      console.warn('ADMIN: onClickDeleteUser');
      console.error(user);
      await User.api().deleteUser(user.id);
      const users = this.$store.$db().model('users').query().all();
      this.arrays.users = users;
    },
    onClickAutoCreateUser() {
      const newModel = createRandomUser(this.models.modelCreateUser);
      this.models.modelCreateUser = newModel;
    },
    fakeUser() {
      console.warn('ADMIN.VUE: fakeUser');
      let model = this.forms.formCreateUser.model.data;
      const new_model = createRandomUser(model);
      this.forms.formCreateUser.model.data = new_model;
    },
  },

  components: {
    Form,
  },
};
</script>
