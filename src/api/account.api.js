import instance from '@/api/main'

class accountAPI {
    getAccount(accountId){
        return instance.get('accounts/' + accountId)
    }
}

export default new accountAPI();