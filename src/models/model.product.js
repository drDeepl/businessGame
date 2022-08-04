export default class ModelProduct {
  constructor() {
    this.props = {
      id: 'id',
      name: 'продукт',
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
    this.hideShow = {id: true};
  }
}
