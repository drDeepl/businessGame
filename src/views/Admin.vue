<template>
  <div class="admin-wrapper">
    <Load v-if="isRenderPage" />
    <div v-else class="tab-wrapper">
      <div class="admin-card-wrapper">
        <v-tabs color="#6C63FF" class="panel-tabs">
          <div class="panel-tabs container">
            <v-tab
              v-for="objectTab in titles.titleTabs"
              :key="objectTab.form"
              @click.prevent="onClickAdminTab(objectTab.form, objectTab.title)"
            >
              <span class="panel-tabs text">{{ objectTab.title }}</span>
            </v-tab>
          </div>

          <!-- // INFO: Форма создания пользователя -->
          <v-tab-item>
            <Form
              v-if="forms.formCreateUser.active"
              :activate="forms.formCreateUser.active"
              :title="titleCurrentForm"
              :model="forms.formCreateUser.model"
              :select="{role: arrays.role, team_id: arrays.teamNames}"
              :disableFields="{team_id: true}"
              :cancelForm="onClickCancelForm"
              :parentFunction="onClickCreateUser"
              :load="$store.getters['user/GET_CREATE_USER']"
              :applySuccess="forms.formCreateUser.applySuccess"
            >
              <div v-if="forms.formCreateUser.model.data.role">
                <div
                  v-if="
                    forms.formCreateUser.model.data.role.toLowerCase() ==
                    'player'
                  "
                >
                  <v-select
                    attach
                    v-if="arrays.teamNames.length > 0"
                    color="#6c63ff"
                    class="pr-2 pl-2 ma-1 admin-form-create-user-select-team"
                    v-model="forms.formCreateUser.model.data.team_id"
                    :items="arrays.teamNames"
                    :label="forms.formCreateUser.model.props.team_id"
                    :rules="[(v) => !!v || 'Поле не может быть пустым']"
                  >
                  </v-select>
                  <v-text-field
                    v-else
                    class="pr-2 pl-2 ma-1"
                    color="#6c63ff"
                    loading="error"
                    readonly
                    persistent-hint
                    v-model="forms.formCreateUser.model.data.team_id"
                    :label="'не найден список команд'"
                    error-messages="сперва необходо создать команду для игрока"
                    :rules="[(v) => !!v]"
                  >
                  </v-text-field>
                </div>
              </div>

              <v-btn class="ma-2" outlined color="orange" @click="fakeUser"
                >Случайные данные</v-btn
              >

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
                  >{{ message }}</small
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
              :applySuccess="forms.formCreateTeam.applySuccess"
            >
              <v-alert
                border="left"
                colored-border
                type="error"
                elevation="2"
                v-if="forms.formCreateTeam.errors.length > 0"
                class="form-error-container"
              >
                <div
                  v-for="message in forms.formCreateTeam.errors"
                  :key="message"
                >
                  <div v-if="typeof message == 'string'">{{ message }}</div>
                  <div v-else>
                    <span>Ошибки в поле:</span>
                    <small class="form-error-text">{{
                      forms.formCreateTeam.model.props[message]
                    }}</small>
                  </div>
                </div>
              </v-alert>
            </Form>
          </v-tab-item>
        </v-tabs>
        <!-- // INFO: Список пользователей -->

        <v-card class="mb-5">
          <v-card-title
            class="offer-card-table-header"
            @click="onClickListUsers"
          >
            <span>Пользователи</span>
            <arrow-icon
              :size="30"
              :class="`arrow-btn ${cardTable.users.active ? 'open' : ''}`"
            />
          </v-card-title>
          <div class="offers-table" v-if="cardTable.users.active">
            <v-list-item class="row-table-offers">
              <v-list-item-content
                v-for="label in models.modelUser.fieldToShow"
                :key="`th_${label}`"
              >
                <span class="row-table-offers-value row-table-header">
                  {{ models.modelUser.titleProps[label] }}
                </span>
              </v-list-item-content>
              <v-list-item-content
                ><span class="row-table-offers-value row-table-header">
                  {{ '' }}
                </span>
              </v-list-item-content>
            </v-list-item>

            <v-list-item
              class="row-table-offers"
              v-for="user in arrays.users"
              :key="user.id"
            >
              <v-list-item-content
                v-for="fieldUser in models.modelUser.fieldToShow"
                :key="fieldUser"
              >
                <span class="row-table-offers-value">
                  {{ user[fieldUser] }}
                </span>
              </v-list-item-content>
              <v-list-item-content class="column-actions">
                <v-btn
                  v-if="!user.is_superuser"
                  color="red lighten-1"
                  icon
                  text
                  class="table-btn-action"
                  @click="onClickDeleteUser(user)"
                >
                  <delete-icon></delete-icon>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </div>
          <DialogError
            :title="alert.message"
            :active="alert.delete.user"
            v-if="alert.delete.user"
          >
            <v-card-actions
              v-if="!alert.delete.success && alert.errors.length == 0"
            >
              <v-btn
                :loading="alert.render"
                color="red"
                text
                @click="onClickDeleteUserApply"
              >
                Удалить
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn :disabled="alert.render" text @click="onClickCancelDelete"
                >Отмена</v-btn
              >
            </v-card-actions>

            <v-card-actions
              v-else-if="alert.errors.length > 0"
              class="d-flex flex-column"
            >
              <ol>
                <li
                  class="dialog-error-li text-center ma-3"
                  v-for="(error, id) in alert.errors"
                  :key="'del_user_' + id"
                >
                  <span>{{ error }}</span>
                </li>
              </ol>

              <v-btn class="btn-apply" @click="onClickCancelDelete">
                закрыть
              </v-btn>
            </v-card-actions>
            <v-card-actions v-else>
              <v-spacer></v-spacer>
              <v-btn class="btn-apply" @click="onClickCancelDelete">
                Отлично
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </DialogError>
        </v-card>
        <v-card class="mb-5">
          <v-card-title
            class="offer-card-table-header"
            @click="onClickListTeam"
          >
            <span>Команды</span>
            <arrow-icon
              :size="30"
              :class="`arrow-btn ${cardTable.teams.active ? 'open' : ''}`"
            />
          </v-card-title>
          <div class="offers-table" v-if="cardTable.teams.active">
            <v-list-item class="row-table-offers">
              <v-list-item-content
                v-for="label in models.modelTeam.fieldToShow"
                :key="`th_${label}`"
              >
                <span class="row-table-offers-value row-table-header">
                  {{ models.modelTeam.titleProps[label] }}
                </span>
              </v-list-item-content>
              <v-list-item-content
                ><span class="row-table-offers-value row-table-header">
                  {{ '' }}
                </span>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="row-table-offers"
              v-for="team in arrays.teams"
              :key="team.id"
            >
              <v-list-item-content
                v-for="fieldTeam in models.modelTeam.fieldToShow"
                :key="fieldTeam"
              >
                <span class="row-table-offers-value">
                  {{ team[fieldTeam] }}
                </span>
              </v-list-item-content>
              <v-list-item-content class="column-actions">
                <v-btn
                  color="red lighten-1"
                  icon
                  text
                  class="table-btn-action"
                  @click="onClickDeleteTeam(team)"
                >
                  <delete-icon></delete-icon>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </div>
          <DialogError
            :title="alert.message"
            :active="alert.delete.team"
            v-if="alert.delete.team"
          >
            <v-card-actions
              v-if="!alert.delete.success && alert.errors.length == 0"
            >
              <v-btn
                :loading="alert.render"
                color="red"
                text
                @click="onClickDeleteTeamApply"
              >
                Удалить
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn :disabled="alert.render" text @click="onClickCancelDelete"
                >Отмена</v-btn
              >
            </v-card-actions>
            <v-card-actions
              v-else-if="alert.errors.length > 0"
              class="d-flex flex-column"
            >
              <ol>
                <li
                  class="dialog-error-li text-center ma-3"
                  v-for="(error, id) in alert.errors"
                  :key="'del_team_' + id"
                >
                  <span>{{ error }}</span>
                </li>
              </ol>

              <v-btn class="btn-apply" @click="onClickCancelDelete">
                закрыть
              </v-btn>
            </v-card-actions>
            <v-card-actions v-else>
              <v-spacer></v-spacer>
              <v-btn class="btn-apply" @click="onClickCancelDelete">
                Отлично
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </DialogError>
        </v-card>
        <v-card>
          <v-card-title
            class="offer-card-table-header"
            @click="onClickListProducts"
          >
            <span>Продукты</span>
            <arrow-icon
              v-if="!cardTable.products.render"
              :size="30"
              :class="`arrow-btn ${cardTable.products.active ? 'open' : ''}`"
            />
            <Load v-else size="20"></Load>
          </v-card-title>
          <div class="offers-table" v-if="cardTable.products.active">
            <v-list-item class="row-table-offers">
              <v-list-item-content
                v-for="label in models.modelProduct.fieldToShow"
                :key="`th_${label}`"
              >
                <span class="row-table-offers-value row-table-header">
                  {{ models.modelProduct.props[label] }}
                </span>
              </v-list-item-content>
              <v-list-item-content
                ><span class="row-table-offers-value row-table-header">
                  {{ '' }}
                </span>
              </v-list-item-content>
            </v-list-item>
            <v-list-item
              class="row-table-offers"
              v-for="product in products"
              :key="product.id"
            >
              <v-list-item-content
                v-for="fieldProduct in models.modelProduct.fieldToShow"
                :key="fieldProduct"
              >
                <span class="row-table-offers-value">
                  {{ product[fieldProduct] }}
                </span>
              </v-list-item-content>
              <v-list-item-content class="column-actions">
                <v-btn
                  color="red lighten-1"
                  icon
                  text
                  class="table-btn-action"
                  @click="onClickDeleteProduct(product)"
                >
                  <delete-icon></delete-icon>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-card>
        <DialogError
          :title="alert.message"
          :active="alert.delete.product"
          v-if="alert.delete.product"
        >
          <v-card-actions
            v-if="!alert.delete.success && alert.errors.length == 0"
          >
            <v-btn
              :loading="alert.render"
              color="red"
              text
              @click="onClickDeleteProductApply"
            >
              Удалить
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn :disabled="alert.render" text @click="onClickCancelDelete"
              >Отмена</v-btn
            >
          </v-card-actions>
          <v-card-actions
            v-else-if="alert.errors.length > 0"
            class="d-flex flex-column"
          >
            <ol>
              <li
                class="dialog-error-li text-center ma-3"
                v-for="(error, id) in alert.errors"
                :key="'del_user_' + id"
              >
                <span>{{ error }}</span>
              </li>
            </ol>

            <v-btn class="btn-apply" @click="onClickCancelDelete">
              закрыть
            </v-btn>
          </v-card-actions>
          <v-card-actions v-else>
            <v-spacer></v-spacer>
            <v-btn class="btn-apply" @click="onClickCancelDelete">
              Отлично
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </DialogError>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

import {createRandomUser} from '@/helpers/helper.fake';
import Message from '@/helpers/messages';

import ModelProduct from '@/models/model.product';
import ModelUserCreate from '@/models/model.user.create';
import ModelUpdateUser from '@/models/model.user.update';
import ModelCreateTeam from '@/models/model.team.create';
import ModelTeam from '@/models/model.team';
import ModelUser from '@/models/model.user';

import UserService from '@/services/user.service';

import User from '@/store/models/User';

import Form from '@/UI/Form.vue';
import Load from '@/UI/Load.vue';

import DialogError from '@/UI/DialogError.vue';

export default {
  components: {
    Form,
    Load,

    DialogError,
  },
  data() {
    return {
      cardTable: {
        products: {
          active: false,
          render: false,
        },
        teams: {
          active: false,
          render: false,
        },
        users: {
          active: false,
          render: false,
        },
      },
      alert: {
        delete: {
          user: false,
          product: false,
          team: false,
          currentItem: null,
          success: false,
        },
        message: '',
        render: false,
        errors: [],
      },
      panels: {
        users: {
          render: false,
        },
        products: {
          render: false,
        },
        teams: {
          render: false,
        },
      },
      render: {
        team: {
          choiceDelete: false,
        },
      },
      messages: new Message(),
      loadingData: true,
      dialogDeleteActive: {
        users: false,
        team: false,
        teamAll: false,
        choiceTeam: false,
        errors: [],
      },
      titleCurrentForm: '',
      currentForm: '',
      loading: {
        users: true,
      },
      expansionPanels: {
        listProducts: {
          open: false,
        },
      },
      values: {
        teamToDelete: [],
      },
      titles:
        this.$store.getters['user/GET_SIDEBAR_LINKS_BY_ROLE']('SUPERUSER')[0],
      models: {
        modelUser: new ModelUser(),
        modelCreateUser: new ModelUserCreate(),
        modelUpdateUser: new ModelUpdateUser(),
        modelProduct: new ModelProduct(),
        modelTeam: new ModelTeam(),
      },
      arrays: {
        role: null,
        teams: null, // INFO: {nameTeam: data team}
        users: null,
        products: [],
        teamNames: [],
      },
      dicts: {
        teams: {}, // INFO: {TeamName: TeamId}
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
          applySuccess: false,
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
          applySuccess: false,
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
    this.$store.commit('admin/SET_RENDER_PAGE_START');
    const currentUser = this.$store.state.auth.user;
    const username = currentUser.username;
    console.error(username);
    const userDataResponse = await User.api().getUserByUsername(username);
    const userData = userDataResponse.response.data;

    if (!userData.is_superuser) {
      this.$router.push('/');
    } else {
      this.arrays.role = await UserService.getRoles();
      const listTeams = await this.$store.dispatch('team/getTeams');
      console.log(`LIST TEAMS ${listTeams}`);
      let dictTeams = {};
      listTeams.forEach((team) => {
        dictTeams[team.name] = team.id;
      });
      console.log(listTeams);

      const listUsers = await this.$store.dispatch('user/getUsers');

      // const listUsers = responseUsers.data ? responseUsers.data : [];
      const products = await this.$store.dispatch('products/getProducts');
      this.arrays.products = products;
      this.arrays.users = listUsers.filter((user) => !user.is_superuser);
      this.arrays.teams = listTeams;
      // this.arrays.teamNames = listTeams.map((team) => team.name);
      this.arrays.teamNames = Object.keys(dictTeams);
      this.dicts.teams = dictTeams;
      console.log(listTeams);
      console.log(dictTeams);
      this.$store.commit('admin/SET_RENDER_PAGE_COMPLETE');
    }
  },
  computed: {
    ...mapGetters({
      getProducts: 'products/GET_STATE_getListProducts',
      dataUserToDelete: 'admin/GET_DELETE_USER_dataUser',
      isDeleteProductRun: 'products/GET_STATE_DELETE_PRODUCT_RUN',
      isAllProductsDeleted: 'products/GET_DELETE_ALL_PRODUCTS',
      isAllProductsDeleteError: 'products/GET_DELETE_ALL_PRODUCTS_ERROR',
      isTeamDelete: 'team/GET_DELETE_TEAM',
      isRenderPage: 'admin/GET_RENDER_PAGE',
      isDeleteUser: 'admin/GET_DELETE_USER',
      deleteUserInProgress: 'admin/GET_DELETE_USER_inProgress',
      isDeleteUserError: 'admin/GET_DELETE_USER_error',
      isDeleteAllUsers: 'admin/GET_DELETE_ALL_USERS',
      isDeleteAllUsersError: 'admin/GET_DELETE_ALL_USERS_ERROR',
      isGetUsers: 'user/GET_STATE_getUser',
    }),

    users() {
      return this.$store.$db().model('users').query().all();
    },
    products() {
      return this.arrays.products;
    },
  },
  methods: {
    checkRenderPanels(name, flag) {
      this.panels[name].render = flag;
    },
    dialogDeleteActivator(name, flag) {
      this.dialogDeleteActive[name] = flag;
    },

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

    async updateListProduct() {
      console.warn('updateListProduct');

      const products = await this.$store.dispatch('products/getProducts');
      this.arrays.products = products;
    },
    // NOTE: USER

    async onClickCreateUser(modelCreateUser) {
      console.warn('ADMIN.VUE: onClickCreateUser');
      console.warn(modelCreateUser);
      this.$store.commit('user/SET_CREATING_USER');
      this.forms.formCreateUser.applySuccess = false;
      this.forms.formCreateUser.errors = [];
      // INFO: modelCreateUser содержит данные из формы
      // INFO: Функция выполняет валидацию данных, полученных из формы
      // INFO: А после показывает ошибки либо отправляет данные на сервер
      console.warn(modelCreateUser);
      if (modelCreateUser.role.toLowerCase() == 'player') {
        const team_id = this.dicts.teams[modelCreateUser['team_id']];

        if (team_id) {
          modelCreateUser['team_id'] = team_id;
        } else {
          this.forms.formCreateUser.errors.push('Такая команда не найдена');
        }
      } else {
        modelCreateUser['team_id'] = this.arrays.teams[0].id;
      }

      console.log('NEW USER\n', modelCreateUser);

      const response = await this.$store.dispatch(
        'user/createUser',
        modelCreateUser
      );
      if (response.success) {
        const user = response.data;
        console.error('CREATED USER\n', user);
        this.forms.formCreateUser.applySuccess = true;
        this.arrays.users.push(user);
      } else {
        if (response.status == 422) {
          this.forms.formCreateUser.errors.push(
            'Имя пользователя "' + modelCreateUser.username + '" уже существует'
          );
        } else {
          this.forms.formCreateUser.errors.push(
            'Что-то пошло не так...\nПопробуйте перезагрузить страницу'
          );
        }
      }
    },
    async updateListUsers() {
      this.checkRenderPanels('users', true);
      const users = await this.$store.dispatch('user/getUsers');
      this.arrays.users = users;
      this.checkRenderPanels('users', false);
      this.dialogDeleteActivator('users', false);
    },
    onClickUpdateUser(user) {
      console.warn('Admin.vue: onClickUpdateUser');
      console.error('USER FROM ROW:\n', user);
      this.forms.formUpdateUser.selectedUser = user;
      this.titleCurrentForm = 'Редактирование пользователя';
      this.forms.formActive = 'formUpdateUser';
      this.forms.formUpdateUser.active = true;
      this.$store.commit('user/SET_USER_ID_ON_UPDATING', user.id);
    },
    async onClickApplyUpdateUser(modelUpdateUser) {
      this.forms.formCreateUser.errors = [];
      this.$store.commit('user/SET_USER_UPDATING');

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
      const userId = this.$store.getters['user/GET_USER_ID_ON_UPDATE'];
      const dataForUpdateUser = {
        userId: userId,
        userData: modelUpdateUser,
      };
      await this.$store.dispatch('user/updateUser', dataForUpdateUser);
      this.$store.commit('user/SET_USER_UPDATED');
    },

    onClickListUsers() {
      console.warn('ADMIN.VUE: onClickListUsers');
      this.cardTable.users.active = !this.cardTable.users.active;
    },
    async onClickApplyDeleteUser() {
      console.warn('ADMIN: onClicApplykDeleteUser');
      this.$store.commit('admin/SET_DELETE_USER_inProgress', true);
      const user = this.dataUserToDelete;
      console.log(user);
      const userId = user.id;
      try {
        await User.api().deleteUser(userId);

        let newUsersArray = this.arrays.users.filter(
          (element) => element.id != userId
        );
        this.arrays.users = newUsersArray;
        this.onClickCancelDeleteUser();
      } catch (e) {
        console.error(e);
        this.$store.commit('admin/SET_DELETE_USER_error', true);
      } finally {
        this.$store.commit('admin/SET_DELETE_USER_inProgress', false);
      }
    },
    onClickCancelDeleteUser() {
      this.$store.commit('admin/SET_DELETE_USER_ACTIVE', false);
      this.$store.commit('admin/SET_DELETE_USER_DATA', null);
      this.$store.commit('admin/SET_DELETE_USER_inProgress', false);
      this.$store.commit('admin/SET_DELETE_USER_error', false);
    },

    onClickDeleteUser(user) {
      console.warn('ADMIN.VUE: onClickDeleteUser');
      this.alert.message = `Удалить пользователя "${user.username}" ?`;
      this.alert.delete.currentDeleteItem = 'user';
      this.alert.delete.currentItem = user;
      this.alert.delete.user = true;
    },
    async onClickDeleteUserApply() {
      console.warn('ADMIN.VUE: onClickDeleteUserApply');
      const user = this.alert.delete.currentItem;
      this.alert.render = true;
      const responseDeleteUser = await this.$store.dispatch(
        'user/deleteUser',
        user.id
      );
      if (responseDeleteUser.status == 200) {
        await this.updateListUsers();
        this.alert.delete.success = true;
        this.alert.message = 'Пользователь успешно удалён!';
      } else {
        this.alert.errors.push('Упс, что-то пошло не так');
      }
      this.alert.render = false;
    },

    async onClickApplyDeleteAllUsers() {
      this.$store.commit('admin/SET_DELETE_ALL_USERS', true);
      await this.$store.dispatch('user/deleteUsers', 1);
      await this.updateListUsers();
      this.$store.commit('admin/SET_DELETE_ALL_USERS', false);
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

    async onClickListProducts() {
      console.warn('ADMIN.VUE: onClickListProducts');
      if (this.cardTable.products.active) {
        this.cardTable.products.active = false;
      } else {
        this.cardTable.products.render = true;
        await this.updateListProduct();
        this.cardTable.products.render = false;
        this.cardTable.products.active = true;
      }
    },

    onClickDeleteProduct(product) {
      console.warn('ADMIN.VUE: onClickDeleteProduct');
      this.alert.message = `Удалить продукт "${product.name}" ?`;
      this.alert.delete.currentDeleteItem = 'product';
      this.alert.delete.currentItem = product;
      this.alert.delete.product = true;
    },
    onClickCancelDelete() {
      console.warn('ADMIN.VUE: onClickCancelDelete');
      const currentItemDelete = this.alert.delete.currentDeleteItem;
      this.alert.delete[currentItemDelete] = false;
      this.alert.delete.success = false;
      this.alert.currentItem = null;
      this.alert.errors = [];
      this.alert.message = '';
    },
    async onClickDeleteProductApply() {
      console.warn('onClickDeleteProduct');
      this.alert.render = true;
      const product = this.alert.delete.currentItem;
      console.log(product);
      const responseDeleteProduct = await this.$store.dispatch(
        'products/deleteProduct',
        product.id
      );
      if (responseDeleteProduct.status == 200) {
        await this.updateListProduct();
        this.alert.delete.success = true;
        this.alert.message = 'Продукт успешно удалён!';
      } else {
        this.alert.errors.push('Упс, что-то пошло не так');
      }
      this.alert.render = false;
    },
    async onClickDeleteProductAll() {
      console.warn('onClickDeleteProductAll');

      this.$store.commit('products/SET_DELETE_ALL_PRODUCTS_START');
      try {
        await this.$store.dispatch('products/deleteProducts', 1);

        await this.updateListProduct();
      } catch {
        this.$store.commit('products/SET_DELETE_ALL_PRODUCTS_COMPLETE');
        this.$store.commit('products/SET_DELETE_ALL_PRODUCTS_ERROR', true);
      }
    },

    onClickCloseErrorProducts() {
      this.$store.commit('products/SET_DELETE_ALL_PRODUCTS_ERROR', false);
    },
    // NOTE: TEAM
    async onClickCreateTeam(modelCreateTeam) {
      console.warn('ADMIN.VUE: onClickCreateTeam');
      this.forms.formCreateTeam.applySuccess = false;
      this.forms.formCreateTeam.errors = [];
      const team = await this.$store.dispatch(
        'team/createTeam',
        modelCreateTeam
      );
      console.log(team);
      if (team.statusCode) {
        this.forms.formCreateTeam.errors.push(team.message);
      } else {
        this.forms.formCreateTeam.applySuccess = true;
        this.arrays.teams.push(team);
        this.arrays.teamNames.push(team.name);
        this.dicts.teams[team.name] = team.id;
      }
    },

    onClickListTeam() {
      console.warn('ADMIN.VUE: onClickListTeam');
      this.cardTable.teams.active = !this.cardTable.teams.active;
    },

    onClickDeleteTeam(team) {
      console.warn('ADMIN.VUE: onClickDeleteTeam');
      this.alert.message = `Удалить команду "${team.name}" ?`;
      this.alert.delete.currentDeleteItem = 'team';
      this.alert.delete.currentItem = team;
      this.alert.delete.team = true;
    },

    async onClickDeleteTeamApply() {
      console.warn('ADMIN.VUE: onClickDeleteTeamApply');
      this.alert.render = true;
      const team = this.alert.delete.currentItem;
      const responseDeleteTeam = await this.$store.dispatch(
        'team/deleteTeam',
        team.id
      );
      if (responseDeleteTeam.status == 200) {
        const newTeams = this.arrays.teams.filter(
          (oldTeam) => oldTeam.id != team.id
        );
        this.arrays.teams = newTeams;
        this.alert.delete.success = true;
        this.alert.message = 'Команда успешно удалена!';
      } else {
        this.alert.errors.push('Упс, что-то пошло не так');
      }
      this.alert.render = false;
    },

    onClickDeleteChoiceTeam() {
      this.dialogDeleteActivator('choiceTeam', true);
    },
    async onClickApplyDeleteChoiceTeam() {
      console.warn('ADMIN: onClickApplyDeleteChoiceTeam');
      const teamsToDelete = this.values.teamToDelete;

      for (let i = 0; i < teamsToDelete.length; i++) {
        const teamName = teamsToDelete[i];
        await this.onClickDeleteTeam(teamName);
      }
      this.dialogDeleteActivator('choiceTeam', false);
      this.values.teamToDelete = [];
    },
    async onClickDeleteTeamAll() {
      console.warn('onCLickDeleteTeamAll');
      this.$store.commit('team/SET_DELETE_TEAM_START');
      await this.$store.dispatch('team/deleteTeams');
      this.arrays.teams = [];
      this.dicts.teams = {};
      this.arrays.teamNames = [];
      await this.updateListUsers();
      this.dialogDeleteActivator('teamAll', false);
    },
  },
};
</script>
