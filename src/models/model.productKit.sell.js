export default class CreateSellOffer {
  constructor() {
    this.props = {
      price: 'Стоимость',
      product_kit_id: 'Продуктовый набор для продукта',
      toTeam: 'Команде',
    };
    this.types = {
      price: 'number',
      product_kit_id: 'number',
      toTeam: 'field',
    };
    this.ruleValidate = {
      price: 'number',
      product_kit_id: 'field',
      toTeam: 'field',
    };
    this.data = {
      price: '',
      product_kit_id: '',
      toTeam: '',
    };
    
  }
}
