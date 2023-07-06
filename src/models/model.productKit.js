export default class ModelProductKit {
  constructor() {
    this.props = {
      id: 'id',
      product: 'Продукт',
      count: 'Количество продуктов',
      time: 'Время приготовления / сек.',
    };
    this.types = {
      id: 'number',
      product: 'number',
      count: 'number',
      time: 'number',
    };
    this.ruleValidate = {
      id: 'number',
      product: 'number',
      count: 'number',
      time: 'number',
    };
    this.hideShow = {id: true, product: true};
  }
}
