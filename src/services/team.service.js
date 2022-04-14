import teamAPI from '@/api/team.api'
import {teamInfo} from '@/_config'

class teamService{
    cashDataTeam = teamInfo
    // teamInfo = {id: integer
    //            name: string
    //            account: integer
    //            }
    
    haveCash(){
        for(let property in this.cashDataTeam){
          if(this.cashDataTeam[property] == null){
            return false
          }
        }
        return true
      }
  
      getDataCash(){
        console.log('TEAM.SERVICE.getDataCash')
        console.log(this.cashDataTeam)
        return this.cashDataTeam
      }

      async getDataTeam(teamId){
          // TODO: Почему haveCash is True??
          if(this.haveCash()){
            console.log(this.cashDataTeam)
            console.log('TEAM.SERVICE.getDataTeam: to cash')
            return this.getDataCash()
          }
          else{
            console.log('TEAM.SERVICE.getDataTeam: to backend')
              const dataTeam = await teamAPI.getTeamInfo(teamId)
              return dataTeam.data
              // this.setDataCash(dataTeam)
              // return dataTeam.data
          }
      }

      setDataCash(dataTeam){
        console.log('teamService: setDataCash')
        console.log(dataTeam)
        for(let property in this.cashDataTeam){
          this.cashDataTeam[property] = dataTeam[property]
        }
        console.log('teamService: setDataCash complete')
        console.log(this.cashDataTeam)
      }
}

export default new teamService();