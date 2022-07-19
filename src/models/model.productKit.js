export default class ModelProductKit {
  constructor() {
    this.props = {
      id: 'id',
      product: 'Продукт',
      count: 'Количество',
      time: 'Время изготовления (сек.)',
    };
    this.types = {
      id: 'number',
      product: 'number',
      count: 'number',
      time: 'number',
    };
    this.ruleValidate = {
      id: 'number',
      product: 'intger',
      count: 'number',
      time: 'number',
    };
  }
}
