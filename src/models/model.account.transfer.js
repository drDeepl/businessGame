export default class AccountTransfer {
  constructor() {
    this.props = {
      account_id_from: 'от',
      account_id_to: 'к',
      amount: 'стоимость',
    };
    this.ruleValidate = {
      account_id_from: 'number',
      account_id_to: 'number',
      amount: 'number',
    };
    this.types = {
      account_id_from: 'number',
      account_id_to: 'number',
      amount: 'number',
    };
    this.data = {
      account_id_from: '',
      account_id_to: '',
      amount: '',
    };
  }
}
