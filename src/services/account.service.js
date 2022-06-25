import accountAPI from '@/api/account.api';
import AccountNotFound from '@/errors/error.exist';
import {createModelFromResponseData} from '@/helpers/helper.model';
import Account from '@/models/model.account';

class AccountService {
  async getAccount(accountId) {
    console.log('ACCOUNT.SERVICE.getAccount');
    const response = await accountAPI.getAccount(accountId);
    if (response.status == 200) {
      const accountInfo = createModelFromResponseData(new Account(), response.data);
      console.warn(accountInfo);
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
