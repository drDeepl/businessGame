import TeamService from '@/services/team.service';
export const team = {
  namespaced: true,
  state: {
    dataTeam: {
      // idTeam: dataTeam
      // useranme: dataTeam
    }
  },
  actions: {
    async getTeamData(context, JSON_usernameIdTeam) {
      // getTeamData получает на вход объект {username: String, idTeam: Integer}
      // JSON_username = {username: String, idTeam: Integer}
      // Получает данные команды по idTeam
      // Затем создает объект {usernmae: dataTeam}
      // Сохраняет данные команды в хранилище в двух экземплярах
      //   1. {idTeam: dataTeam}
      //   2. {username: dataTeam}
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
    }
  },
  getters: {
    GET_DATA_TEAM_BY_ID: state => id => {
      console.warn('MODULE.TEAM: GET_DATA_TEAM_BY_ID');
      return state.dataTeam[id];
    },
    GET_DATA_TEAM_BY_USERNAME: state => username => {
      return state.dataTeam[username];
    }
  },
  mutations: {
    SET_TEAM_DATA: function(state, data) {
      console.warn('MODULE.TEAM: SET_TEAM_DATA');
      const username = data.username;
      const dataTeam = data.dataTeam;
      state.dataTeam[username] = dataTeam;
      state.dataTeam[dataTeam.id] = dataTeam;
    }
  }
};
