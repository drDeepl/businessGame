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
              <v-alert
                border="right"
                colored-border
                type="error"
                elevation="2"
                v-if="forms.formCreateUser.errors.length > 0"
                class="form-error-container"
                >Ошибки в следующий полях:
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
                  @click.prevent="onClickUpdateUser(user)"
                  >Редактировать</v-btn
                >
              </v-card>

              <Form
                :activate="forms.formUpdateUser.active"
                :title="titleCurrentForm"
                :model="forms.formUpdateUser.model"
                :select="{role: arrays.role, team_id: arrays.team}"
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

import {validationMixin} from 'vuelidate';
import {required, email, numeric} from 'vuelidate/lib/validators';
import ModelUserCreate from '@/models/model.user.create';
import ModelUpdateUser from '@/models/model.user.update';
import ModelCreateTeam from '@/models/model.team.create';
import User from '@/models/model.user';
import UserService from '@/services/user.service';
import {createRandomUser} from '@/helpers/helper.fake';
import {validateForm} from '@/helpers/helper.form';

export default {
  async created() {
    const currentUser = this.$store.state.auth.user;
    const username = currentUser.username;
    console.warn('MAINLAYOUT: created');
    await this.$store.dispatch('user/getUserDataByUsName', username);
    const userData = this.$store.getters['user/GET_USER_INFO_BY_USERNAME'](
      username
    );
    if (!userData.is_superuser) {
      this.$router.push('/');
    } else {
      this.arrays.role = await UserService.getRoles();
      await this.$store.dispatch('team/getTeams');
      const JSON_namesTeams = this.$store.getters['team/GET_LIST_NAMES_TEAMS'];
      const listNamesTeams = Object.keys(JSON_namesTeams);
      this.arrays.team = listNamesTeams;
      await this.$store.dispatch('user/getUsers');
      let listUsers = this.$store.getters['user/GET_LIST_USERS'];
      this.arrays.users = listUsers;
      console.log(listUsers);
    }
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
          modelToValidate: null,
          select: {
            role: [],
            team_id: this.$store.getters['team/GET_LIST_NAMES_TEAMS']
          },
          errors: []
        },
        formUpdateUser: {
          active: false,
          model: new ModelUpdateUser(),
          modelToValidate: null,
          select: {role: [], team_id: []},
          values: {}, // INFO: value хранит информацию о пользователе для подстановки в форму
          selectedUser: null,
          errors: []
        },
        formCreateTeam: {
          active: false,
          model: new ModelCreateTeam(),
          errors: [],
          modelToValidate: null
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
  mixins: [validationMixin],
  validations: {
    forms: {
      formCreateUser: {
        modelToValidate: {
          username: {required},
          first_name: {required},
          last_name: {required},
          email: {required, email: email},
          role: {required},
          password: {required},
          team_id: {required}
        }
      },
      formCreateTeam: {
        modelToValidate: {
          name: {required},
          balance: {required, number: numeric}
        }
      },
      formUpdateUser: {
        modelToValidate: {
          first_name: {required},
          last_name: {required},
          role: {required},
          team_id: {required}
        }
      }
    }
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
      this.forms.formCreateUser.errors = [];
      // INFO: modelCreateUser содержит данные из формы
      // INFO: Функция выполняет валидацию данных, полученных из формы
      // INFO: А после показывает ошибки либо отправляет данные на сервер
      console.warn(modelCreateUser);
      this.forms.formCreateUser.modelToValidate = modelCreateUser;
      this.$v.forms.formCreateUser.modelToValidate.$touch();
      let validateModel = this.$v.forms.formCreateUser.modelToValidate;
      const errors = validateForm(validateModel);
      if (errors.length > 0) {
        this.forms.formCreateUser.errors = errors;
      } else {
        this.forms.formCreateUser.errors = [];
        const team_id = this.$store.getters['team/GET_DATA_TEAM_BY_TeamName'](
          modelCreateUser.team_id
        ).id;
        const newUser = modelCreateUser;
        newUser.team_id = team_id;
        console.error('NEW USER\n', newUser);
        await this.$store.dispatch('user/createUser', newUser);
      }
    },
    async onClickCreateTeam(modelCreateTeam) {
      console.warn('ADMIN.VUE: onClickCreateTeam');
      this.forms.formCreateTeam.errors = [];
      this.forms.formCreateTeam.modelToValidate = modelCreateTeam;
      this.$v.forms.formCreateTeam.modelToValidate.$touch();
      let validateModel = this.$v.forms.formCreateTeam.modelToValidate;
      const errors = validateForm(validateModel);
      console.error(errors);
      if (errors.length > 0) {
        this.forms.formCreateTeam.errors = errors;
      } else {
        // // TODO: Проверить результат кода
        // console.warn('ADMIN.vue: onCLickCretaeTeam');
        // console.error(modelCreateTeam);
        await this.$store.dispatch('team/createTeam', modelCreateTeam);
        const JSON_namesTeams = this.$store.getters[
          'team/GET_LIST_NAMES_TEAMS'
        ];
        const listNamesTeams = Object.keys(JSON_namesTeams);
        this.arrays.team = listNamesTeams;
      }
    },
    onClickUpdateUser(user) {
      console.warn('Admin.vue: onClickUpdateUser');
      console.error('USER FROM ROW:\n', user);
      this.forms.formUpdateUser.selectedUser = user;
      for (let key in this.forms.formUpdateUser.model.props) {
        this.forms.formUpdateUser.model[key] = user[key];
      }
      this.forms.formUpdateUser.values = user;
      this.titleCurrentForm = 'Редактирование пользователя';
      this.forms.formActive = 'formUpdateUser';
      this.forms.formUpdateUser.active = true;
    },
    async onClickApplyUpdateUser(modelUpdateUser) {
      // [07.07.2022] TODO: Сделать функцию обновления даных пользователя
      console.warn('ADMIN.vue: onClickUpdateUser');
      console.error(modelUpdateUser);
      this.forms.formUpdateUser.errors = [];
      this.forms.formUpdateUser.modelToValidate = modelUpdateUser;
      this.$v.forms.formUpdateUser.modelToValidate.$touch();
      let validateModel = this.$v.forms.formUpdateUser.modelToValidate;
      const errors = validateForm(validateModel);
      console.error(errors);
      if (errors.length > 0) {
        this.forms.formUpdateUser.errors = errors;
      } else {
        console.error(modelUpdateUser);
        const userId = this.forms.formUpdateUser.selectedUser.id;
        const team_id = this.$store.getters['team/GET_DATA_TEAM_BY_TeamName'](
          modelUpdateUser.team_id
        ).id;
        modelUpdateUser.team_id = team_id;
        let dataForUpdateUser = {
          userId: userId,
          data: modelUpdateUser
        };
        await this.$store.dispatch('user/updateUser', dataForUpdateUser);
        this.arrays.users = await this.$store.dispatch('user/getUsers');
        this.arrays.users.reverse();
      }
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
