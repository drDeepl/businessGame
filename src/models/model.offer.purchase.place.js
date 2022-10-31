export default class OfferPurchasePlace {
  constructor() {
    this.props = {
      price: 'Цена',
      count: 'Количество',
      product_id: 'Продукт',
    };
    this.ruleValidate = {
      price: 'number',
      count: 'number',
      product_id: 'number',
    };
    this.types = {
      price: 'number',
      count: 'number',
      product_id: 'number',
    };
    this.data = {
      price: '',
      count: '',
      product_id: '',
    };
    this.hideShow = {
      product_id: true,
    };
  }
}
