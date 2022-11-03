<template>
  <div class="admin-wrapper">
    <div class="tab-wrapper">
      <div class="admin-card-wrapper">
        <v-tabs
          color="#6C63FF"
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
              <v-progress-circular
                class="manufacturer-layout"
                indeterminate
                size="64"
                v-if="arrays.users == null || arrays.users == undefined"
              ></v-progress-circular>
              <div v-else class="admin-list-users-wrapper">
                <!-- TODO: переделать через независимый компонент -->
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
                    class="admin-row-user-btn mr-2"
                    outlined
                    color="#31c48d"
                    rounded
                    @click="onClickUpdateUser(user)"
                    >Редактировать</v-btn
                  >

                  <v-btn
                    outlined
                    color="red"
                    rounded
                    @click="onClickDeleteUser(user)"
                  >
                    <delete-icon />
                  </v-btn>
                </v-card>

                <Form
                  :activate="forms.formUpdateUser.active"
                  :title="titleCurrentForm"
                  :model="forms.formUpdateUser.model"
                  :select="{role: arrays.role, team_id: teamNames}"
                  :parentFunction="onClickApplyUpdateUser"
                  :values="forms.formUpdateUser.values"
                  :cancelForm="onClickCancelForm"
                  :load="$store.getters['user/GET_USER_UPDATING']"
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
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel @click="onClickListProducts">
            <v-expansion-panel-header>
              <span>Список продуктов</span>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <div
                class="admin-panel-products-layout"
                v-if="products.length > 0"
              >
                <ProductCard
                  v-for="product in products"
                  :key="product.id"
                  :title="{name: product.name}"
                  :item="product"
                  :modelItem="models.modelProduct"
                >
                  <v-card-actions>
                    <v-btn
                      color="red darken-1"
                      icon
                      @click="onClickDeleteProduct(product)"
                    >
                      <v-spacer><delete-icon /></v-spacer>
                    </v-btn>
                  </v-card-actions>
                </ProductCard>
              </div>
              <div><v-card-text>Нет созданных продуктов</v-card-text></div>
              <Load v-if="getProducts || isDeleteProductRun" />
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
import ProductCard from '@/UI/ProductCard.vue';

export default {
  data() {
    return {
      dialog: false,
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
    }
  },
  computed: {
    ...mapGetters({
      getProducts: 'products/GET_STATE_getListProducts',
      isDeleteProductRun: 'products/GET_STATE_DELETE_PRODUCT_RUN',
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
      // await User.api().getListUsers();
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
      const userId = this.$store.getters['user/GET_USER_ID_ON_UPDATE'];
      const dataForUpdateUser = {
        userId: userId,
        userData: modelUpdateUser,
      };
      await this.$store.dispatch('user/updateUser', dataForUpdateUser);
      this.$store.commit('user/SET_USER_UPDATED');
    },

    async onClickDeleteUser(user) {
      console.warn('ADMIN: onClickDeleteUser');
      this.$store.commit('user.SET_USER_DELETE');
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
    async updateListProduct() {
      console.warn('updateListProduct');
      const products = await this.$store.dispatch('products/getProducts');
      this.arrays.products = products;
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
  },

  components: {
    Form,
    Load,
    ProductCard,
  },
};
</script>
