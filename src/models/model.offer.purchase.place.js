export default class OfferPurchasePlace {
  constructor() {
    this.props = {
      price: 'Цена',
      to_customer: 'Покупатель',
      count: 'Количество',
      product_id: 'Продукт',
    };
    this.ruleValidate = {
      price: 'number',
      to_customer: 'number',
      count: 'number',
      product_id: 'number',
    };
    this.types = {
      price: 'number',
      to_customer: 'number',
      count: 'number',
      product_id: 'number',
    };
    this.data = {
      price: '',
      to_customer: '',
      count: '',
      product_id: '',
    };
    this.hideShow = {
      product_id: true,
    };
  }
}
