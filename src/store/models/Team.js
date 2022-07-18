import {Model} from '@vuex-orm/core';
import {createAuthHeader} from '@/helpers/JWT.helper';

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
    actions: {
      async createTeam(modelCreateTeam, jwt) {
        console.warn('MODEL.TEAM: createTeam');
        const config = createAuthHeader(jwt);
        return this.post('teams', modelCreateTeam, config);
      },
      async getListTeams(jwt) {
        console.warn('MODEL.TEAM: getListTeams');
        const config = createAuthHeader(jwt);
        return this.get('teams', config);
      },
      async getTeam(teamId, jwt) {
        console.warn('MODEL.TEAM: getTeam');
        const config = createAuthHeader(jwt);
        return this.get('team/' + teamId, config);
      },
    },
    async getParticipantsTeams(teamId, jwt) {
      console.warn('MODEL.TEAM: getParticipantsTeams');
      const config = createAuthHeader(jwt);
      return this.get('team/' + teamId + '/participants', config);
    },
    async movePlayer(modelMovePlayer, jwt) {
      console.warn('MODEL.TEAM: movePlayer');
      const config = createAuthHeader(jwt);
      return this.put('teams', modelMovePlayer, config);
    },
    async renameTeam(teamId, nameTeam, jwt) {
      console.warn('MODEL.TEAM: renameTeam');
      const config = createAuthHeader(jwt);
      return this.put('team/' + teamId + '/' + nameTeam, config);
    },
    async removeTeam(teamId, jwt) {
      console.warn('MODEL.TEAM: removeTeam');
      const config = createAuthHeader(jwt);
      return this.delete('teams/' + teamId, config);
    },
  };
}
