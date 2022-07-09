export default class Account {
  constructor() {
    this.props = ['id', 'is_unlimited', 'balance'];
    this.types = {id: 'integer', is_unlimited: 'boolean', balance: 'integer'};
  }
}
