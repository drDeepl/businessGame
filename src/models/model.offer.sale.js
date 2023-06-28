class SaleOffer {
  constructor() {
    this.props = {
      id: 'id',
      product: 'Комплект для продукта',
      product_kit: 'Продуктовый набор',
      trader: 'Продавец',
      price: 'Цена',
      team: 'Команда',
      timestamp: 'Создан',
      state: 'Статус',
    };
    this.ruleValidate = {
      id: 'number',
      product: 'field',
      trader: 'number',
      team: 'field',
      price: 'number',
      timestamp: 'field',
      state: 'field',
      product_kit: 'number',
    };
    this.types = {
      id: 'number',
      product: 'field',
      trader: 'number',
      team: 'number',
      price: 'number',
      timestamp: 'string',
      state: 'string',
      product_kit: 'number',
    };
    this.data = {
      id: '',
      product: '',
      trader: '',
      team: '',
      price: 0,
      timestamp: '',
      state: '',
      product_kit: '',
    };
    this.fieldToShow = ['trader', 'product_kit', 'price'];
    this.hideShow = {
      id: true,
      timestamp: true,
      state: true,
      product: true,
      team: true,
    };
  }
}

export default new SaleOffer();
