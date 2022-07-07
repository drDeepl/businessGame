<template>
  <div class="admin-wrapper">
    <div class="tab-wrapper">
      <div class="admin-card-wrapper">
        <v-card
          class="admin-layout"
          v-for="objectTab in titles.titleCards"
          :key="objectTab.id"
          @click.prevent="
            onClickAdminTab(objectTab.value, objectTab.form, objectTab.id)
          "
        >
          <v-card-title class="text-caption">{{
            objectTab.value
          }}</v-card-title>
        </v-card>
      </div>
    </div>

    <div>
      <v-window class="admin-content" v-model="currentTab">
        <!-- NOTE: Вкладка создать пользователя -->
        <!-- <v-window-item v-if="models.modelCreateUser != null" :value="1"> -->
        <Form
          :activate="forms.formCreateUser.active"
          :title="titleCurrentTab"
          :model="models.modelCreateUser"
          :select="{role: arrays.role, team_id: arrays.team}"
          :parentFunction="onClickCreateUser"
          :cancelForm="onClickCancelForm"
        >
        </Form>
        <!-- </v-window-item> -->
        <!-- NOTE: Вкладка "список пользователей" -->
        <v-window-item :value="4">
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
            <!-- NOTE: Диалоговая форма редактирования пользователя-->
            <!-- <v-form ref="form" v-model="valid" class="admin-edit-user">
                <div v-for="field in forms.formEditUser.fields" :key="field">
                  <v-text-field
                    v-if="(field != 'role') & (field != 'team')"
                    class="edit-user-text pt-1"
                    color="indigo"
                    v-model="models.modelUpdateUser[field]"
                    :label="models.modelUpdateUser.titleProps[field]"
                    required
                  >
                  </v-text-field>
                  <v-select
                    v-else
                    :label="models.modelUpdateUser.titleProps[field]"
                    :items="arrays[field]"
                  >
                  </v-select>
                </div>

                <v-btn
                  class="admin-row-user-btn"
                  outlined
                  color="#31c48d"
                  rounded
                  @click.prevent="onApplyEditUser()"
                  >Изменить</v-btn
                >
                <v-btn
                  class="admin-row-user-btn"
                  outlined
                  color="#31c48d"
                  rounded
                  @click.prevent="onCancelEditUser()"
                  >Отмена</v-btn
                >
              </v-form> -->
            <Form
              :activate="forms.formEditUser.active"
              :title="titleCurrentTab"
              :model="models.modelUpdateUser"
              :select="{role: this.arrays.role, team: this.arrays.team}"
              :parentFunction="onClickApplyEditUser"
              :cancelForm="onClickCancelForm"
            >
            </Form>
          </div>
        </v-window-item>
      </v-window>
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
import UpdateUser from '@/models/model.user.update';
import User from '@/models/model.user';
import Form from '@/UI/Form.vue';
export default {
  async created() {
    console.warn(this.$el);
    this.arrays.role = await UserService.getRoles();
    await this.$store.dispatch('team/getTeams');
    const namesTeams = this.$store.getters['team/GET_LIST_NAMES_TEAMS'];
    this.arrays.team = namesTeams;
    let listUsers = this.$store.getters['user/GET_LIST_USERS'];
    if (!listUsers) {
      listUsers = await this.$store.dispatch('user/getUsers');
    }
    this.arrays.users = listUsers;
    console.log(listUsers);
  },

  data() {
    return {
      titleCurrentTab: '',
      currentTab: 0,
      titles: this.$store.getters['user/GET_SIDEBAR_LINKS_BY_ROLE'](
        'SUPERUSER'
      )[0],
      valid: true,
      models: {
        user: new User(),
        modelCreateUser: new ModelUserCreate(),
        modelUpdateUser: new UpdateUser()
      },
      arrays: {
        role: [],
        team: [],
        users: []
      },
      // NOTE: Идея: Создать форму-шаблон в которой данные будут реактивно меняться

      forms: {
        formActive: '', // INFO: titleTab из onClickAdminTab
        formCreateUser: {
          title: '',
          model: new ModelUserCreate(),
          select: {
            role: [],
            team_id: this.$store.getters['team/GET_LIST_NAMES_TEAMS']
          },
          active: false
        },
        formEditUser: {
          placeholder: {},
          active: false
        },
        formCreateTeam: {
          active: false
        },
        formCreateAccountTeam: {
          active: false
        }
      },
      // INFO: listUsersHeader отображает данные,
      // INFO: которые покажутся на внешней стороне карточки
      listUsersHeaders: {id: true, username: true, role: true, team: true}
    };
  },
  methods: {
    onClickAdminTab(titleTab, formTitle, id) {
      // NOTE: titleTab = value, formTitle = form, id = id in _config/titleCards
      console.warn('ADMIN.VUE: onClickAdminTab');
      this.titleCurrentTab = titleTab;
      console.error(this.forms.formActive);
      console.warn(titleTab + '\n' + formTitle + '\n' + typeof id);
      if (id < 4) {
        this.forms.formActive = formTitle;
        this.forms[formTitle].active = true;
        console.error(this.forms.formActive);
      } else {
        this.currentTab = id;
      }
    },
    onClickCancelForm() {
      const activeForm = this.forms.formActive;
      console.error(activeForm);
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
    onClickEditUser(user) {
      // [05.07.2022] INFO: Функция принимает на вход объект пользователям
      // [05.07.2022] INFO: Затем перебирает названия свойств для формы label в Edit User
      // [05.07.2022] INFO: которые берутся из из объекта UpdateUser в model.user.update
      // [05.07.2022] INFO: После активируется форма
      console.warn('Admin.vue: onClickEditUser');
      this.forms.formActive = 'formEditUser';
      this.forms.formEditUser.active = true;
      this.forms.formEditUser.placeholder = user;
      console.error(user);
      console.warn(this.formStatus);
      console.error(this.models.modelUpdateUser);
      // for (let i in this.models.modelUpdateUser.titleProps) {
      //   this.models.modelUpdateUser[i] = user[i];
      // }
      // this.forms.formEditUser.fields = Object.keys(
      //   this.models.modelUpdateUser.titleProps
      // );
      // this.forms.formEditUser.active = true;
    },
    onClickApplyEditUser(model) {
      // [07.07.2022] TODO: Сделать функцию обновления даных пользователя
      console.error('ADMIN.vue: onClickApplyEditUser');
      console.warn(model);
    },
    // onCancelEditUser() {
    //   this.forms.formEditUser.active = false;
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
