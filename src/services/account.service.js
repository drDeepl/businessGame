import accountAPI from '@/api/account.api';
import Account from '@/models/model.account';

class accountService {
  async getAccountData(accountId) {
    console.log('ACCOUNT.SERVICE.getBalance');
    const accountResponse = await accountAPI.getAccount(accountId);
    if (accountResponse.status == 200) {
      const accountData = new Account(accountResponse.data);
      console.log('\t ACCOUNT_DATA', accountData);
      return accountData;
    }
  }

  async getListAccounts() {
    const accounts = await accountAPI.getAccounts();
    return accounts.data;
  }
}

export default new accountService();
