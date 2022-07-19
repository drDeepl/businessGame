export default class CreateProductKit {
  constructor() {
    this.props = {
      count: 'Количество продуктов в наборе',
      time: 'Время приготовления набора (в минутах)',
      product_id: 'Продукт для создания набора продуктов',
    };
    this.ruleValidate = {
      count: 'number',
      time: 'number',
      product_id: 'number',
    };
    this.types = {
      count: 'number',
      time: 'number',
      product_id: 'number',
    };
    this.data = {
      count: '',
      time: '',
      product_id: '',
    };
  }
}
