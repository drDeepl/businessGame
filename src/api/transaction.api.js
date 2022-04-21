import instance from '@/api/main';

class transactionsAPI {
  getListTransactions() {
    return instance.get('transactions');
  }
  getTransaction(id) {
    return instance.get('transactions/' + id);
  }
}

export default new transactionsAPI();
