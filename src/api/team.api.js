import instance from '@/api/main'

class teamAPI{
    
    getTeams(){
        return instance.get('teams')
    }

    getTeamInfo(teamId) {
        return instance.get('teams/' + teamId)
    }

    createTeam(name, balance=0){
        const request = {
            'name': name,
            'balance': balance
        }
        return instance.post('teams/', request)
    }
    deleteTeam(teamId){
        return instance.delete('teams/' + teamId)
    }

    movePlayer(playerId, teamId){
        const request = {
            'player_id': playerId,
            'team_id': teamId
        }
        return instance.put('teams/', request)
    }

    renameTeam(teamId, name){
        return instance.put('teams/' + teamId + '/' + name)
    }


}

export default new teamAPI();

