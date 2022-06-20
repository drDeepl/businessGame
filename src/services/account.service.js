import accountAPI from '@/api/account.api';
import Account from '../models/model.account';
import AccountNotFound from '@/errors/error.exist';

class AccountService {
  async getAccount(accountId) {
    console.log('ACCOUNT.SERVICE.getAccount');
    const response = await accountAPI.getAccount(accountId);
    console.warn(response);
    if (response.status == 200) {
      const accountInfo = new Account(response.data);
      return accountInfo;
    } else {
      throw new AccountNotFound('Account Not Exists');
    }
  }

  async getListAccounts() {
    const accounts = await accountAPI.getAccounts();
    return accounts.data;
  }
}

export default new AccountService();
