import teamAPI from '@/api/team.api';
import Team from '@/models/model.team';
import {createModelFromResponseData} from '@/helpers/helper.model';
import teamApi from '../api/team.api';

class teamService {
  async createTeam(dataForCreate) {
    console.warn('TEAM.SERVICE: createTeam');
    dataForCreate.balance = Number.parseInt(dataForCreate.balance);
    const dataTeam = await teamAPI.createTeam(dataForCreate);
    return dataTeam;
  }
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

  async deleteTeam(teamId) {
    return await teamApi.removeTeam(teamId);
  }
}

export default new teamService();
