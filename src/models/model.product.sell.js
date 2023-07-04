class CreateProductSell {
  constructor() {
    this.props = {
      price: 'Стоимость',
      count: 'Количество',
      product: 'Продукт',
      to_customer: 'Покупатель:',
    };
    this.types = {
      price: 'number',
      count: 'number',
      product: 'number',
      team_id: 'field',
    };
    this.ruleValidate = {
      price: 'number',
      count: 'number',
      product: 'field',
      to_customer: 'field',
    };
    this.data = {
      price: '',
      count: '',
      product: '',
      to_customer: '',
    };
    this.hideShow = {product: true};
  }
}

export default new CreateProductSell();
