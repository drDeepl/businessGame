import teamAPI from '@/api/team.api';
import Team from '@/models/model.team';
import {createModelFromResponseData} from '@/helpers/helper.model';

class teamService {
  async getDataTeam(teamId) {
    console.warn('TEAM.SERVICE: getDataTeam');
    const response = await teamAPI.getTeamInfo(teamId);
    if (response.status == 200) {
      let model = new Team();
      const dataTeam = createModelFromResponseData(model, response.data);
      return dataTeam;
    } else {
      throw new Error(
        'TEAM.SERVICE.getDataTeam: Status Code ' + response.status
      );
    }
  }

  async getTeams() {
    const teams = await teamAPI.getTeams();
    return teams.data;
  }

  async getIdTeams() {
    console.warn('TEAM.SERVICE: getIdTeams');
    const arrayTeams = await this.getTeams();
    console.log(arrayTeams);
  }
}

export default new teamService();
