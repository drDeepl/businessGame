export default class ModelProduct {
  constructor() {
    this.props = {
      id: 'id',
      name: 'Название продукта',
    };
    this.types = {
      id: 'number',
      name: 'string',
    };
    this.ruleValidate = {
      id: 'number',
      name: 'field',
    };
    this.data = {
      id: 0,
      name: '',
    };
  }
}
