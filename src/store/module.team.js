import TeamService from '@/services/team.service';
export const team = {
  namespaced: true,
  state: {
    dataTeam: {
      // INFO: idTeam: dataTeam
      // INFO: useranme: dataTeam
      // INFO: dataByName: {teamName:dataTeam}
      dataByName: {}
    }
  },
  actions: {
    async getTeamData(context, JSON_usernameIdTeam) {
      // INFO: getTeamData получает на вход объект {username: String, idTeam: Integer}
      // INFO: JSON_username = {username: String, idTeam: Integer}
      // INFO: Получает данные команды по idTeam
      // INFO: Затем создает объект {usernmae: dataTeam}
      // INFO: Сохраняет данные команды в хранилище в двух экземплярах
      // INFO:   1. {idTeam: dataTeam}
      // INFO:   2. {username: dataTeam}
      console.warn('MODULE.TEAM: getTeamData');
      console.log(JSON_usernameIdTeam);
      const username = JSON_usernameIdTeam.username;
      const idTeam = JSON_usernameIdTeam.idTeam;
      const data = await TeamService.getDataTeam(idTeam);
      console.log(data);
      const dataTeam = {
        username: username,
        dataTeam: data
      };
      context.commit('SET_TEAM_DATA', dataTeam);
    },
    async getTeams(context) {
      console.warn('MODULE.TEAM: getTeams');
      const listTeams = await TeamService.getTeams();
      context.commit('SET_TEAM_DATA_BY_NAME', listTeams);
    }
  },
  getters: {
    GET_DATA_TEAM_BY_ID: state => id => {
      console.warn('MODULE.TEAM: GET_DATA_TEAM_BY_ID');
      return state.dataTeam[id];
    },
    GET_DATA_TEAM_BY_USERNAME: state => username => {
      return state.dataTeam[username];
    },
    GET_LIST_NAMES_TEAMS: state => {
      console.warn('MODULE.TEAM: GET_LIST_NAMES_TEAMS');
      // INFO: Функция возвращает список ключей объекта state.dataTeam.dataByName
      const listNames = state.dataTeam.dataByName;
      return Object.keys(listNames);
    },
    GET_DATA_TEAM_BY_TeamName: state => teamName => {
      return state.dataTeam.dataByName[teamName];
    }
  },
  mutations: {
    SET_TEAM_DATA: function(state, data) {
      console.warn('MODULE.TEAM: SET_TEAM_DATA');
      const username = data.username;
      const dataTeam = data.dataTeam;
      state.dataTeam[username] = dataTeam;
      state.dataTeam[dataTeam.id] = dataTeam;
    },
    SET_TEAM_DATA_BY_NAME: function(state, listDataTeams) {
      console.warn('MODULE.TEAM: SET_TEAM_DATA_BY_NAME');
      console.log(state);
      for (let i in listDataTeams) {
        let teamName = listDataTeams[i].name;
        state.dataTeam.dataByName[teamName] = listDataTeams[i];
      }
    }
  }
};
