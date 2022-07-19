export default class Account {
  constructor() {
    this.props = ['id', 'is_unlimited', 'balance'];
    this.types = {
      id: 'number',
      is_unlimited: 'boolean',
      balance: 'number',
    };
    this.data = {id: 0, balance: 0, is_unlimited: false};
  }
}
