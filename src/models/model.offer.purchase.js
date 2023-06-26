class PurchaseOffer {
  constructor() {
    this.props = {
      id: 'id',
      product: 'продукт',
      price: 'цена',
      trader: 'продавец',
      timestamp: 'создан',
      state: 'статус',
    };
    this.ruleValidate = {
      id: 'number',
      product: 'number',
      trader: 'number',
      price: 'number',
      timestamp: 'field',
      state: 'field',
    };
    this.types = {
      id: 'number',
      product: 'number',
      trader: 'number',
      price: 'number',
      timestamp: 'string',
      state: 'string',
    };
    this.data = {
      id: '',
      product: 0,
      trader: '',
      price: 0,
      timestamp: '',
      state: '',
    };
    this.propsToShow = {
      product: true,
      trader: true,
      price: true,
    };
  }
}

export default new PurchaseOffer();
