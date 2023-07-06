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
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <span>Список пользователей</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <Load v-if="panels.users.render" />
              <div v-else>
                <v-btn
                  text
                  icon
                  color="green lighten-1"
                  @click.prevent="updateListUsers"
                  ><restore-icon
                /></v-btn>

                <v-btn
                  text
                  color="red lighten-1"
                  @click.prevent="dialogDeleteActive.users = true"
                >
                  <span>удалить всех пользователей</span>
                </v-btn>
                <DataTable
                  :items="arrays.users"
                  :modelItem="models.user"
                  :haveDeleteFunc="true"
                  :onClickDeleteItem="onClickDeleteUser"
                  :hideColumns="{account: true}"
                />
              </div>

              <v-expand-transition :hide-on-leave="true" mode="out-in">
                <DialogError
                  v-if="isDeleteUserError"
                  :active="isDeleteUserError"
                  :title="messages.errorTitle"
                >
                  <v-card-text class="text-display-1 text-center">
                    {{ messages.reloadPage }}
                  </v-card-text>

                  <v-flex align-self-center>
                    <v-card-actions>
                      <v-btn
                        color="red lighten-1"
                        text
                        :loading="deleteUserInProgress"
                        @click.prevent="onClickCancelDeleteUser"
                      >
                        закрыть
                      </v-btn>
                    </v-card-actions>
                  </v-flex>
                </DialogError>
                <DialogError
                  v-else
                  :title="messages.deleteUserTitle + '?'"
                  :active="isDeleteUser"
                >
                  <v-card-text v-if="!!dataUserToDelete" class="text-body-2">
                    Будет удалён пользователь с именем
                    <span class="font-weight-bold">
                      {{ dataUserToDelete.username }}
                    </span>
                  </v-card-text>
                  <v-flex align-self-center>
                    <v-card-actions>
                      <v-btn
                        color="green lighten-1"
                        text
                        :loading="deleteUserInProgress"
                        @click.prevent="onClickApplyDeleteUser"
                      >
                        Да
                      </v-btn>
                      <v-btn
                        color="red lighten-1"
                        text
                        @click.prevent="onClickCancelDeleteUser"
                      >
                        Нет
                      </v-btn>
                    </v-card-actions>
                  </v-flex>
                </DialogError>
              </v-expand-transition>
              <DialogError
                :active="dialogDeleteActive.users"
                :title="messages.deleteAllUsersTitle"
              >
                <v-flex align-self-center>
                  <v-card-actions>
                    <v-btn
                      @click.prevent="onClickApplyDeleteAllUsers"
                      :loading="isDeleteAllUsers"
                      text
                      color="red lighten-1"
                      >Да, удалить
                    </v-btn>
                    <v-btn
                      text
                      @click.prevent="dialogDeleteActivator('users', false)"
                      >Отмена
                    </v-btn>
                  </v-card-actions>
                </v-flex>
              </DialogError>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel @click="onClickListProducts">
            <v-expansion-panel-header>
              <span>Список продуктов</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div v-if="products.length > 0">
                <v-btn
                  color="red darken-1"
                  text
                  :loading="isAllProductsDeleted"
                  @click="onClickDeleteProductAll"
                >
                  <span>Очистить список продуктов</span>
                </v-btn>
                {{ products }}
                <DataTable
                  :items="products"
                  :modelItem="models.modelProduct"
                  :haveDeleteFunc="true"
                  :onClickDeleteItem="onClickDeleteProduct"
                />
              </div>
              <Load v-else-if="panels.products.render" />
              <div v-else>
                <v-card-text>Нет созданных продуктов</v-card-text>
              </div>
              <DialogError
                :active="isAllProductsDeleteError"
                :title="messages.errorTtile"
              >
                <v-btn
                  text
                  color="red lighten-1"
                  @click.prevent="onClickCloseErrorProducts"
                  >закрыть</v-btn
                >
              </DialogError>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <span>Список команд</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-card-text v-if="arrays.teams.length == 0">
                Список команд ещё пуст
              </v-card-text>

              <v-list v-else dense>
                <v-card-actions
                  class="flex-sm-column justify-start align-start"
                >
                  <v-btn
                    class="mb-1"
                    text
                    color="red"
                    @click="
                      dialogDeleteActivator(
                        'teamAll',
                        true,
                        messages.deleteTeamDescription
                      )
                    "
                  >
                    <span>Удалить все команды</span>
                  </v-btn>
                  <v-select
                    class="mb-1 mt-1"
                    v-model="values.teamToDelete"
                    :items="arrays.teamNames"
                    chips
                    attach
                    multiple
                    :menu-props="{closeOnContentClick: true}"
                    color="#6c63ff"
                    item-color="success"
                    label="Удалить команды"
                  ></v-select>
                  <v-btn
                    v-if="values.teamToDelete.length > 0"
                    class="btn-cancel"
                    @click="onClickDeleteChoiceTeam"
                  >
                    Удалить выбранные
                  </v-btn>
                </v-card-actions>
                <DataTable
                  :items="arrays.teams"
                  :modelItem="models.modelTeam"
                />
                <DialogError
                  v-if="dialogDeleteActive.teamAll"
                  :title="messages.deleteTeam"
                  :active="dialogDeleteActive.teamAll"
                >
                  <v-card-text>
                    {{ messages.deleteTeamDescription }}
                  </v-card-text>
                  <v-btn
                    text
                    color="red lighten-1"
                    :loading="isTeamDelete"
                    @click.prevent="onClickDeleteTeamAll"
                  >
                    Да, удалить
                  </v-btn>
                  <v-btn
                    text
                    color="green lighten-1"
                    :loading="isTeamDelete"
                    @click.prevent="() => (dialogDeleteActive.teamAll = false)"
                  >
                    Отмена
                  </v-btn>
                </DialogError>
                <DialogError
                  title="Что-то пошло не так"
                  :active="dialogDeleteActive.errors.length > 0"
                >
                  <v-card-text
                    v-for="message in dialogDeleteActive.errors"
                    :key="message"
                  >
                    {{ message }}
                  </v-card-text>
                  <v-btn
                    text
                    color="red lighten-1"
                    :loading="isTeamDelete"
                    @click.prevent="() => (dialogDeleteActive.errors = [])"
                  >
                    Ок
                  </v-btn>
                </DialogError>
                <DialogError
                  title="Удалить выбранные команды?"
                  :active="dialogDeleteActive.choiceTeam"
                >
                  <v-card-text>
                    {{ messages.deleteTeamDescription }}
                  </v-card-text>
                  <v-btn
                    text
                    color="red lighten-1"
                    :loading="render.team.choiceDelete"
                    @click.prevent="onClickApplyDeleteChoiceTeam"
                  >
                    Да
                  </v-btn>
                  <v-btn
                    text
                    color="green lighten-1"
                    :loading="render.team.choiceDelete"
                    @click.prevent="dialogDeleteActivator('choiceTeam', false)"
                  >
                    Закрыть
                  </v-btn>
                </DialogError>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-card outlined @click="onClickListProducts">
          <v-card-title class="offer-card-table-header">
            <span>Список продуктов</span>
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
                  Действие
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

import DataTable from '@/UI/DataTable.vue';
import DialogError from '@/UI/DialogError.vue';

export default {
  components: {
    Form,
    Load,
    DataTable,
    DialogError,
  },
  data() {
    return {
      cardTable: {
        products: {
          active: false,
          render: false,
        },
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
        user: new ModelUser(),
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
    // teamNames() {
    //   console.warn('ADMIN.VUE: teamNames');
    //   let listTeams = this.$store.$db().model('teams').query().all();
    //   let namesTeam = listTeams.map((team) => team.name);
    //   return namesTeam;
    // },
    users() {
      return this.$store.$db().model('users').query().all();
    },
    products() {
      return this.arrays.products;
    },
    // teams() {
    //   return this.arrays.teams;
    // },
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
      this.forms.formCreateUser.erros = [];
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
    async onClickDeleteUser(user) {
      console.warn('onClickDeleteUser');
      this.$store.commit('admin/SET_DELETE_USER_ACTIVE', true);
      this.$store.commit('admin/SET_DELETE_USER_DATA', user);
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

      // this.$store.commit('products/SET_GET_LIST_PRODUCTS_RUN');
      // this.checkRenderPanels('products', true);
      // if (this.panels.products) {
      //   console.log('open panel with products');

      //   this.checkRenderPanels('products', false);
      // }
    },

    onClickDeleteProduct(product) {
      console.warn('ADMIN.VUE: onClickDeleteProduct');
      console.log(product);
    },
    async onClickDeleteProductApply(product) {
      console.warn('onClickDeleteProduct');
      this.$store.commit('products/SET_DELETE_PRODUCT_RUN');
      console.error('TODO');
      console.log(product);
      await this.$store.dispatch('products/deleteProduct', product.id);
      await this.updateListProduct();
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
    async onClickDeleteTeam(teamName) {
      console.warn('onClickDeleteTeam');
      this.render.team.choiceDelete = true;

      try {
        const teamId = this.dicts.teams[teamName];
        console.log(teamId);
        const teams = this.arrays.teams;
        const newTeams = teams.filter((team) => team.id != teamId);
        this.arrays.teams = newTeams;
        await this.$store.dispatch('team/deleteTeam', teamId);
        const dictsTeams = this.dicts.teams;
        delete dictsTeams[teamName];
        const users = this.arrays.users;
        const newUsers = users.filter((user) => user.team_id != teamId);
        this.arrays.users = newUsers;
        this.dicts.teams = dictsTeams;
        this.arrays.teamNames = Object.keys(dictsTeams);
        console.log(Object.keys(dictsTeams));
      } catch (e) {
        console.error(e);
        this.dialogDeleteActivator('choiceTeam', false);
        this.dialogDeleteActive.errors.push(
          'Что-то пошло не так. Попробуйте перезагрузить страницу'
        );
      }

      this.render.team.choiceDelete = false;
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
