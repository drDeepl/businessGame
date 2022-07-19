export default class SaleOffer {
  constructor() {
    this.props = {
      id: 'id',
      product_kit: 'Продуктовый набор',
      price: 'Цена',
      trader: 'Продавец',
      timestamp: 'Создан',
      state: 'Статус',
    };
    this.ruleValidate = {
      id: 'number',
      trader: 'number',
      price: 'number',
      timestamp: 'field',
      state: 'field',
      product_kit: 'number',
    };
    this.types = {
      id: 'number',
      trader: 'number',
      price: 'number',
      timestamp: 'string',
      state: 'string',
      product_kit: 'number',
    };
    this.data = {
      id: '',
      trader: '',
      price: 0,
      timestamp: '',
      state: '',
      product_kit: '',
    };
  }
}
