export default class ModelProductKit {
  constructor() {
    this.props = {
      id: 'id',
      product: 'Продукт',
      count: 'Количество',
      time: 'Время изготовления (сек.)',
    };
    this.types = {
      id: 'integer',
      product: 'intger',
      count: 'integer',
      time: 'integer',
    };
    this.ruleValidate = {
      id: 'integer',
      product: 'intger',
      count: 'integer',
      time: 'integer',
    };
  }
}
