export default class CreateSellOffer {
  constructor() {
    this.props = {
      price: 'Стоимость',
      product_kit_id: 'Продуктовый набор для продукта',
      team_id: 'Команде:',
    };
    this.types = {
      price: 'number',
      product_kit_id: 'number',
      team_id: 'field',
    };
    this.ruleValidate = {
      price: 'number',
      product_kit_id: 'field',
      team_id: 'field',
    };
    this.data = {
      price: '',
      product_kit_id: '',
      team_id: '',
    };
  }
}
