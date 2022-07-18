export default class SaleOffer {
  constructor() {
    this.props = {
      id: 'id',
      trader: 'Продавец',
      price: 'Цена',
      timestamp: 'Создан',
      state: 'Статус предложения',
      product_kit: 'Продуктовый набор',
    };
    this.ruleValidate = {
      id: 'integer',
      trader: 'integer',
      price: 'integer',
      timestamp: 'field',
      state: 'field',
      product_kit: 'integer',
    };
  }
}
