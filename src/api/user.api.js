import instance from '@/api/main'


class userAPI {

    getUsers(){
        return instance.get('users')
    }

    getUserData(userId){
        console.log('get data ')
        return instance.get('users/' + userId)
        
    }
}

export default new userAPI();