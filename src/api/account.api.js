import instance from '@/api/main';

class accountAPI {
  getAccount(accountId) {
    return instance.get('accounts/' + accountId);
  }

  getAccounts() {
    return instance.get('accounts');
  }
}

export default new accountAPI();
