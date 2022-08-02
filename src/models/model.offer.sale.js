export default class SaleOffer {
  constructor() {
    this.props = {
      id: 'id',
      for_product: 'Комплект для продукта',
      product_kit: 'Продуктовый набор',
      price: 'Цена',
      trader: 'Продавец',
      timestamp: 'Создан',
      state: 'Статус',
    };
    this.ruleValidate = {
      id: 'number',
      for_product: 'field',
      trader: 'number',
      price: 'number',
      timestamp: 'field',
      state: 'field',
      product_kit: 'number',
    };
    this.types = {
      id: 'number',
      for_product: 'field',
      trader: 'number',
      price: 'number',
      timestamp: 'string',
      state: 'string',
      product_kit: 'number',
    };
    this.data = {
      id: '',
      for_product: '',
      trader: '',
      price: 0,
      timestamp: '',
      state: '',
      product_kit: '',
    };
    this.hideOn = {id: true, timestamp: true, product_kit: true};
  }
}
