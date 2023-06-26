import Team from './models/Team';
import {decorateResponseApi} from '@/services/utils.service';
export const team = {
  namespaced: true,
  state: {
    getTeam: false,
    getTeams: false,
    getNamesTeams: {
      getNames: false,
      listNamesTeams: [],
    },
    deleteTeam: false,
    getBalance: {
      running: false,
      value: 0,
    },
  },
  actions: {
    async getDataTeam(context, teamId) {
      console.warn('MODULE.TEAM: getTeamData');
      context.commit('SET_GET_TEAM');
      const responseWrap = await Team.api().getTeam(teamId);
      context.commit('SET_GET_TEAM_COMPLETE');
      return responseWrap.response.data;
    },
    async getTeams(context) {
      console.warn('MODULE.TEAM: getTeams');
      context.commit('SET_GET_TEAMS');
      const responseWrap = await Team.api().getListTeams();
      context.commit('SET_GET_TEAMS_COMPLETE');
      const listTeams = responseWrap.response.data;
      context.commit('SET_NAMES_TEAM', listTeams);
      const data = listTeams.items ? listTeams.items : listTeams;
      return data;
    },
    async createTeam(context, dataForCreate) {
      console.warn('MODULE.TEAM: createTeam');
      console.error(dataForCreate);

      const responseWrap = await Team.api()
        .createTeam(dataForCreate)
        .catch((error) => {
          const status = error.response.status;
          let response = {statusCode: status, message: ''};
          if (status === 400) {
            response.message = 'Команда с таким названием уже существует';
            return response;
          } else {
            response.message = 'Что-то пошло не так';
          }
        });
      console.log(responseWrap);
      if (responseWrap.statusCode) {
        return responseWrap;
      }

      return responseWrap.response.data;
    },

    async getBalance(context, teamId) {
      console.log('MODULE.TEAM: Team balance');
      const response = decorateResponseApi(Team.api().getBalance, teamId);
      return response;
    },

    async updateTeamBalance(context, teamId) {
      console.warn('MODULE.TEAM: updateTeamBalance');
      context.commit('SET_BALANCE_RUNNING');
      let result = {isHaveError: false};
      const responseTeamBalance = await context.dispatch('getBalance', teamId);
      if (responseTeamBalance.status == 200) {
        console.error('RESPONSE TEAM BALANCE');
        console.log(responseTeamBalance);
        context.commit('SET_BALANCE', responseTeamBalance.data);
      } else {
        result.isHaveError = true;
      }
      context.commit('SET_BALANCE_RUNNING_COMPLETE');
      return result;
    },

    async deleteTeam(context, teamId) {
      console.warn('TEAM.MODULE: deleteTeam');
      console.log(context);
      context.commit('SET_DELETE_TEAM_COMPLETE');
      const responseWrap = await Team.api().removeTeam(teamId);
      return responseWrap.response.data;
    },
    async deleteTeams(context) {
      console.warn('TEAM.MODULE: deleteTeam');
      console.log(context);
      context.commit('SET_DELETE_TEAM_COMPLETE');
      const responseWrap = await Team.api().deleteTeams();
      return responseWrap.response.data;
    },
  },
  getters: {
    GET_DELETE_TEAM: (state) => {
      return state.deleteTeam;
    },
    GET_TEAM_STATE: (state) => {
      return state.getTeam;
    },
    GET_BALANCE_VALUE: (state) => {
      return state.getBalance.value;
    },
    GET_BALANCE_STATE: (state) => {
      return state.getBalance.running;
    },
    GET_DATA_TEAM_BY_ID: (state) => (id) => {
      console.warn('MODULE.TEAM: GET_DATA_TEAM_BY_ID');
      return state.dataTeam[id];
    },
    GET_DATA_TEAM_BY_USERNAME: (state) => (username) => {
      return state.dataTeam[username];
    },
    GET_LIST_NAMES_TEAMS: (state) => {
      console.warn('MODULE.TEAM: GET_LIST_NAMES_TEAMS');
      // INFO: Функция возвращает  объект с команлами
      return state.getNamesTeams.arrayNamesTeams;
    },
    GET_DATA_TEAM_BY_TeamName: (state) => (teamName) => {
      return state.dataTeam.dataByName[teamName];
    },
  },
  mutations: {
    SET_DELETE_TEAM_START: function (state) {
      state.deleteTeam = true;
    },
    SET_DELETE_TEAM_COMPLETE: function (state) {
      state.deleteTeam = false;
    },
    SET_BALANCE: function (state, balance) {
      console.warn('MODULE.TEAM: set balance');
      state.getBalance.value = balance;
    },

    SET_BALANCE_RUNNING: function (state) {
      state.getBalance.running = true;
    },
    SET_BALANCE_RUNNING_COMPLETE: function (state) {
      state.getBalance.running = false;
    },
    SET_GET_TEAM: function (state) {
      state.getTeam = true;
    },
    SET_GET_TEAM_COMPLETE: function (state) {
      state.getTeam = false;
    },
    SET_GET_TEAMS: function (state) {
      state.getTeams = true;
    },
    SET_GET_TEAMS_COMPLETE: function (state) {
      state.getTeams = false;
    },
  },
};
