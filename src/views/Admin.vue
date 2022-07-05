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

    <div>
      <v-window class="admin-content" v-model="currentTab">
        <!-- // INFO: Вкладка создать пользователя -->
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
                :label="models.modelCreateUser.props[textField]"
                required
              ></v-text-field>
              <v-select
                v-else
                v-model="models.modelCreateUser[textField]"
                :items="arrays[textField]"
                :label="models.modelCreateUser.props[textField]"
                required
              >
              </v-select>
            </div>
            <v-btn
              class="admin-btn-form"
              outlined
              color="#31c48d"
              rounded
              @click.prevent="onClickCreateUser()"
            >
              Создать пользователя
            </v-btn>
            <v-btn
              class="admin-btn-form"
              outlined
              color="orange"
              rounded
              @click.prevent="onClickAutoCreateUser()"
            >
              Создать рандомного пользователя
            </v-btn>
          </form>
        </v-window-item>
        <!-- INFO: Вкладка "список пользователей" -->
        <v-window-item :value="4">
          <div class="admin-list-users-wrapper">
            <v-card class="ma-2 pa-3 admin-row-user-card list-users-header">
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
            <v-dialog v-model="forms.formEditUser.active" max-width="45%">
              <v-form ref="form" v-model="valid" class="admin-edit-user">
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
              </v-form>
            </v-dialog>
          </div>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/user.service';
import {createRandomUser} from '@/helpers/helper.fake';
// [05.07.2022] TODO: Решить проблему свойства team_id во вкладке создания пользователя
// [05.07.2022] TODO:  Сделать вывод существующих команд
// [05.07.2022] TODO: Сделать отправку запроса на изменение пользователя
import ModelUserCreate from '@/models/model.user.create';
import UpdateUser from '@/models/model.user.update';
import User from '@/models/model.user';
export default {
  async created() {
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
        role: null,
        team: null,
        users: null
      },
      forms: {
        formEditUser: {
          active: false,
          fields: null
        }
      },
      // INFO: listUsersHeader отображает данные,
      // INFO: которые покажутся на внешней стороне карточки
      listUsersHeaders: {id: true, username: true, role: true, team: true}
    };
  },
  methods: {
    // [04.07.2022] TODO: Добавить обновление БД с пользователями
    onClickAdminTab(id) {
      console.warn('ADMIN.VUE: onClickAdminTab');
      this.currentTab = id;
      console.log(id);
    },
    async onClickCreateUser() {
      console.warn('ADMIN.VUE: onClickApplyUpdate');
      const team_id = this.$store.getters['team/GET_DATA_TEAM_BY_TeamName'](
        this.models.modelCreateUser.team_id
      ).id;
      this.models.modelCreateUser.team_id = team_id;
      await this.$store.dispatch(
        'user/createUser',
        this.models.modelCreateUser
      );
    },
    onClickEditUser(user) {
      console.warn('Admin.vue: onClickEditUser');
      // [05.07.2022] INFO: Функция принимает на вход объект пользователям
      // [05.07.2022] INFO: Затем перебирает названия свойств для формы label в Edit User
      // [05.07.2022] INFO: которые берутся из из объекта UpdateUser в model.user.update
      // [05.07.2022] INFO: После активируется форма
      for (let i in this.models.modelUpdateUser.titleProps) {
        this.models.modelUpdateUser[i] = user[i];
      }
      this.forms.formEditUser.fields = Object.keys(
        this.models.modelUpdateUser.titleProps
      );
      this.forms.formEditUser.active = true;
    },
    onCancelEditUser() {
      this.forms.formEditUser.active = false;
    },
    onClickAutoCreateUser() {
      const newModel = createRandomUser(this.models.modelCreateUser);
      this.models.modelCreateUser = newModel;
    }
  }
};
</script>
