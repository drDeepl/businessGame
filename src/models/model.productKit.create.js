export default class CreateProductKit {
  constructor() {
    this.props = {
      count: 'Количество продуктов в наборе',
      time: 'Время приготовления набора (в минутах)',
      product_id: 'Продукт для создания набора продуктов'
    };
    this.ruleValidate = {
      count: 'integer',
      time: 'integer',
      product_id: 'integer'
    };
  }
}
