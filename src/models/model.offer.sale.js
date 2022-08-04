export default class SaleOffer {
  constructor() {
    this.props = {
      id: 'id',
      product: 'Комплект для продукта',
      product_kit: 'Продуктовый набор',
      price: 'Цена',
      trader: 'Продавец',
      timestamp: 'Создан',
      state: 'Статус',
    };
    this.ruleValidate = {
      id: 'number',
      product: 'field',
      trader: 'number',
      price: 'number',
      timestamp: 'field',
      state: 'field',
      product_kit: 'number',
    };
    this.types = {
      id: 'number',
      product: 'field',
      trader: 'number',
      price: 'number',
      timestamp: 'string',
      state: 'string',
      product_kit: 'number',
    };
    this.data = {
      id: '',
      product: '',
      trader: '',
      price: 0,
      timestamp: '',
      state: '',
      product_kit: '',
    };
    this.hideShow = {id: true, timestamp: true, product_kit: true};
  }
}
