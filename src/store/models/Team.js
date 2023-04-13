import {Model} from '@vuex-orm/core';
import TokenService from '@/services/token.service';

console.warn('MODEL.TEAM');

export default class Team extends Model {
  static entity = 'teams';
  static fields() {
    return {
      id: this.number(null),
      name: this.string(''),
      account: this.number(null),
    };
  }
  static apiConfig = {
    headers: {
      Authorization: TokenService.getLocalAccessToken(),
    },
    actions: {
      async createTeam(modelCreateTeam) {
        console.warn('MODEL.TEAM: createTeam');
        return this.post('teams/', modelCreateTeam);
      },
      async getListTeams() {
        console.warn('MODEL.TEAM: getListTeams');
        return this.get('teams');
      },
      async getTeam(teamId) {
        console.warn('MODEL.TEAM: getTeam');
        return this.get('teams/' + teamId);
      },
      async getBalance(teamId) {
        return this.get('teams/balance/' + teamId);
      },
      async getParticipantsTeams(teamId) {
        console.warn('MODEL.TEAM: getParticipantsTeams');
        return this.get('teams/' + teamId + '/participants');
      },
      async movePlayer(modelMovePlayer) {
        console.warn('MODEL.TEAM: movePlayer');
        return this.put('teams/', modelMovePlayer);
      },
      async renameTeam(teamId, nameTeam) {
        console.warn('MODEL.TEAM: renameTeam');
        return this.put('teams/' + teamId + '/' + nameTeam);
      },

      async removeTeam(teamId) {
        console.warn('MODEL.TEAM: removeTeam');
        return this.delete('teams/' + teamId, {delete: teamId});
      },

      async deleteTeams() {
        return this.delete('teams-delete/' + 1);
      },
    },
  };
}
