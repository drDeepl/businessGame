export default class ProductKitStore {
  constructor() {
    this.props = {
      product_kit: 'Продуктовый набор для продукта',
      count: 'Количество продуктов после создания',
    };
    this.ruleValidate = {
      product_kit: 'field',
      count: 'number',
    };
    this.types = {
      product_kit: 'Object',
      count: 'number',
    };
    this.data = {
      product_kit: null,
      count: 0,
    };
  }
}
