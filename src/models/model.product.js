export default class ModelProduct {
  constructor() {
    this.props = {
      id: 'id',
      name: 'Название продукта',
    };
    this.types = {
      id: 'integer',
      name: 'string',
    };
    this.ruleValidate = {
      id: 'integer',
      name: 'field',
    };
  }
}
