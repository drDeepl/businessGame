import {Model} from '@vuex-orm/core';
import TokenService from '@/services/token.service';

console.warn('MODEL.TEAM');

export default class Team extends Model {
  static entity = 'teams';
  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(''),
      account: this.attr(null),
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
    },
    async getParticipantsTeams(teamId) {
      console.warn('MODEL.TEAM: getParticipantsTeams');
      return this.get('team/' + teamId + '/participants');
    },
    async movePlayer(modelMovePlayer) {
      console.warn('MODEL.TEAM: movePlayer');
      return this.put('teams/', modelMovePlayer);
    },
    async renameTeam(teamId, nameTeam) {
      console.warn('MODEL.TEAM: renameTeam');
      return this.put('team/' + teamId + '/' + nameTeam);
    },
    async removeTeam(teamId) {
      console.warn('MODEL.TEAM: removeTeam');
      return this.delete('teams/' + teamId);
    },
  };
}
