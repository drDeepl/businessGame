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
              :activate="forms.formCreateUser.active"
              :title="titleCurrentForm"
              :model="forms.formCreateUser.model"
              :select="{role: arrays.role, team_id: teamNames}"
              :disableFields="{team_id: true}"
              :cancelForm="onClickCancelForm"
              :parentFunction="onClickCreateUser"
              :load="$store.getters['user/GET_CREATE_USER']"
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
                    v-if="teamNames.length > 0"
                    color="#6c63ff"
                    class="pr-2 pl-2 ma-1 admin-form-create-user-select-team"
                    v-model="forms.formCreateUser.model.data.team_id"
                    :items="teamNames"
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
                  :items="users"
                  :modelItem="models.user"
                  :onClickDeleteItem="onClickDeleteUser"
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
                <v-list>
                  <div v-for="product in products" :key="product.id">
                    <v-list-item>
                      <v-list-item-icon>
                        <v-btn
                          color="red darken-1"
                          icon
                          @click="onClickDeleteProduct(product)"
                        >
                          <delete-icon />
                        </v-btn>
                      </v-list-item-icon>
                      <v-list-item-content>
                        {{ product.name }}
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-0"></v-divider>
                  </div>
                </v-list>
              </div>
              <Load v-else-if="getProducts || isDeleteProductRun" />
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
              <v-card-text v-if="teams.length == 0">
                Список команд ещё пуст
              </v-card-text>
              <v-list v-else dense>
                <v-btn
                  text
                  color="red"
                  @click="onClickDeleteTeamAll"
                  :loading="isTeamDelete"
                >
                  <span>Очистить список команд(TO FIXED)</span>
                </v-btn>
                <div v-for="team in teams" :key="team.id">
                  <v-list-item>
                    <v-list-item-icon>
                      <v-btn
                        icon
                        color="red"
                        :loading="isTeamDelete"
                        @click="onClickDeleteTeam(team.id)"
                      >
                        <delete-icon></delete-icon>
                      </v-btn>
                    </v-list-item-icon>
                    <v-list-item-content>
                      {{ team.name }}
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="pa-0 mt-0"></v-divider>
                </div>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

import {codeErrorResponse} from '@/helpers/helper.error';
import {createRandomUser} from '@/helpers/helper.fake';
import Message from '@/helpers/messages';

import ModelProduct from '@/models/model.product';
import ModelUserCreate from '@/models/model.user.create';
import ModelUpdateUser from '@/models/model.user.update';
import ModelCreateTeam from '@/models/model.team.create';
import ModelUser from '@/models/model.user';
import UserService from '@/services/user.service';

import User from '@/store/models/User';
import Team from '@/store/models/Team';

import Form from '@/UI/Form.vue';
import Load from '@/UI/Load.vue';
import DataTable from '@/UI/DataTable.vue';
import DialogError from '@/UI/DialogError.vue';
// import ProductCard from '@/UI/ProductCard.vue';

export default {
  components: {
    Form,
    Load,
    DataTable,
    DialogError,
  },
  data() {
    return {
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
      messages: new Message(),
      loadingData: true,
      dialogDeleteActive: {
        users: false,
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
      titles:
        this.$store.getters['user/GET_SIDEBAR_LINKS_BY_ROLE']('SUPERUSER')[0],
      models: {
        user: new ModelUser(),
        modelCreateUser: new ModelUserCreate(),
        modelUpdateUser: new ModelUpdateUser(),
        modelProduct: new ModelProduct(),
      },
      arrays: {
        role: null,
        teams: null, // INFO: {nameTeam: data team}
        users: null,
        products: [],
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
    this.$store.commit('admin/SET_RENDER_PAGE_START');
    const currentUser = this.$store.state.auth.user;
    const username = currentUser.username;
    console.error(username);
    const userData = await User.api().getUserByUsername(username);

    userData.is_superuser = true;
    if (!userData.is_superuser) {
      this.$router.push('/');
    } else {
      this.arrays.role = await UserService.getRoles();

      const listTeams = await Team.api().getListTeams();

      let listUsers = await User.api().getListUsers();
      console.warn(listTeams.response.data);
      this.arrays.users = listUsers.response.data;
      this.arrays.teams = listTeams.response.data;
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
    teamNames() {
      console.warn('ADMIN.VUE: teamNames');
      const listTeams = this.$store.$db().model('teams').query().all();
      let namesTeam = listTeams.map((team) => team.name);
      return namesTeam;
    },
    users() {
      return this.$store.$db().model('users').query().all();
    },
    products() {
      return this.arrays.products;
    },
    teams() {
      return this.arrays.teams;
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
    async onClickCreateUser(modelCreateUser) {
      console.warn('ADMIN.VUE: onClickCreateUser');
      console.warn(modelCreateUser);
      this.$store.commit('user/SET_CREATING_USER');
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
          this.forms.formCreateUser.errors.push('Такая команда не найдена');
        }
      } else {
        modelCreateUser['team_id'] = 0;
      }

      console.log('NEW USER\n', modelCreateUser);
      try {
        const responseWrap = await this.$store.dispatch(
          'user/createUser',
          modelCreateUser
        );
        console.error('CREATED USER\n', responseWrap.response.data);
        const listUsers = this.$store.$db().model('users').query().all();
        this.arrays.users = listUsers;
      } catch (e) {
        console.warn(e);
        const errorCode = codeErrorResponse(e);
        if (errorCode == 422) {
          this.forms.formCreateUser.errors.push(
            'Имя пользователя уже существует'
          );
        }
      }
    },
    async onClickCreateTeam(modelCreateTeam) {
      console.warn('ADMIN.VUE: onClickCreateTeam');
      console.error(modelCreateTeam);
      const createdTeam = await Team.api().createTeam(modelCreateTeam);
      console.error(createdTeam);
    },
    async updateListProduct() {
      console.warn('updateListProduct');

      const products = await this.$store.dispatch('products/getProducts');
      this.arrays.products = products;
    },
    async updateListUsers() {
      this.checkRenderPanels('users', true);
      this.$store
        .$db()
        .model('users')
        .delete((user) => {
          return !user.is_superuser;
        });
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
        const users = this.$store.$db().model('users').query().all();
        this.onClickCancelDeleteUser();
        this.arrays.users = users;
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
      console.warn('onClickListProducts');
      this.$store.commit('products/SET_GET_LIST_PRODUCTS_RUN');
      this.expansionPanels.listProducts.open =
        !this.expansionPanels.listProducts.open;
      if (this.expansionPanels.listProducts.open) {
        console.log('open panel with products');
        await this.updateListProduct();
      }
    },

    async onClickDeleteProduct(product) {
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

    async onClickDeleteTeam(teamId) {
      console.warn('onClickDeleteTeam');
      this.$store.commit('team/SET_DELETE_TEAM_START');
      await this.$store.dispatch('team/deleteTeam', teamId);
    },
    async onClickDeleteTeamAll() {
      // FIX Переписать через backend
      console.warn('onCLickDeleteTeamAll');
      while (this.arrays.teams.length != 0) {
        const team = this.arrays.teams.pop();
        console.log(team);
        await this.$store.dispatch('team/deleteTeam', team.id);
      }
    },
  },
};
</script>
