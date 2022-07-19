export default class CreateSellOffer {
  constructor() {
    this.props = {
      price: 'Стоимость',
      product_kit_id: 'Продуктовый набор для продукта',
    };
    this.types = {
      price: 'number',
      product_kit_id: 'number',
    };
    this.ruleValidate = {
      price: 'number',
      product_kit_id: 'field',
    };
    this.data = {
      price: '',
      product_kit_id: '',
    };
  }
}
