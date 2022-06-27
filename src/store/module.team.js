import TeamService from '@/services/team.service';
export const team = {
  namespaced: true,
  state: {
    dataTeam: {
      // idTeam: accountData
    }
  },
  actions: {
    async getTeamData(context, teamId) {
      console.warn('MODULE.TEAM: getTeamData');
      const data = await TeamService.getDataTeam(teamId);
      context.commit('SET_TEAM_DATA', data);
    }
  },
  getters: {},
  mutations: {
    SET_TEAM_DATA: function(state, data) {
      console.warn('MODULE.TEAM: SET_TEAM_DATA');
      state.dataTeam[data.id] = data;
    }
  }
};
