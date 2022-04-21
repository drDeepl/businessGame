import transactionAPI from '@/api/transaction.api';

class transactionService {
  async getTransactions() {
    const arrayTransactions = await transactionAPI.getListTransactions();
    return arrayTransactions.data;
  }

  async getTransaction(id) {
    const transaction = await transactionAPI.getTransaction(id);
    return transaction.data;
  }
}
export default new transactionService();
