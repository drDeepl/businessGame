export default class CreateSellOffer {
  constructor() {
    this.props = {
      price: 'Стоимость',
      product_kit_id: 'Продуктовый набор для продукта',
    };
    this.typesProps = {
      price: 'integer',
      product_kit_id: 'integer',
    };
    this.ruleValidate = {
      price: 'integer',
      product_kit_id: 'field',
    };
  }
}
