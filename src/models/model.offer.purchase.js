class PurchaseOffer {
  constructor() {
    this.props = {
      id: 'id',
      product: 'продукт',
      price: 'цена',
      trader: 'продавец',
      to_customer: 'покупатель',
      timestamp: 'создан',
      state: 'статус',
    };
    this.ruleValidate = {
      id: 'number',
      product: 'number',
      trader: 'number',
      to_customer: 'number',
      price: 'number',
      timestamp: 'field',
      state: 'field',
    };
    this.types = {
      id: 'number',
      product: 'number',
      trader: 'number',
      to_customer: 'number',
      price: 'number',
      timestamp: 'string',
      state: 'string',
    };
    this.data = {
      id: '',
      product: 0,
      trader: '',
      to_customer: 0,
      price: 0,
      timestamp: '',
      state: '',
    };
    this.propsToShow = {
      product: true,
      trader: true,
      price: true,
    };

    this.fieldToShow = ['trader', 'product', 'to_customer', 'price'];
  }
}

export default new PurchaseOffer();
