export default class ModelTransaction {
  constructor() {
    this.props = {
      account_id_from: 'продавец',
      account_id_to: 'покупатель',
      amount: 'цена',
      timestamp: 'дата сделки',
    };
    this.types = {
      account_id_from: 'number',
      account_id_to: 'number',
      amount: 'number',
      timestamp: 'string',
    };
    this.ruleValidate = {
      account_id_from: 'number',
      account_id_to: 'number',
      amount: 'number',
      timestamp: 'field',
    };
    this.data = {
      account_id_from: '',
      account_id_to: '',
      amount: '',
      timestamp: '',
    };
  }
}
