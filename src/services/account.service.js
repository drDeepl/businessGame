import accountAPI from '@/api/account.api';

class accountService{

    async getBalance(accountId){
        console.log('ACCOUNT.SERVICE.getBalance')
        const dataAccount = await accountAPI.getAccount(accountId);
        return dataAccount.data.balance
    }
}

export default new accountService();