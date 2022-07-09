import instance from '@/api/main';

class teamAPI {
  getTeams() {
    return instance.get('teams');
  }

  getTeamInfo(teamId) {
    return instance.get('teams/' + teamId);
  }

  async createTeam(dataForCreate) {
    console.warn('TEAM.API: createTeam');
    const request = {
      name: dataForCreate.name,
      balance: dataForCreate.balance
    };
    console.error(request);
    return instance.post('teams/', request);
  }
  deleteTeam(teamId) {
    return instance.delete('teams/' + teamId);
  }

  movePlayer(playerId, teamId) {
    const request = {
      player_id: playerId,
      team_id: teamId
    };
    return instance.put('teams/', request);
  }

  renameTeam(teamId, name) {
    return instance.put('teams/' + teamId + '/' + name);
  }
}

export default new teamAPI();
