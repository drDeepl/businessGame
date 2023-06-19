class CreateProductSell {
  constructor() {
    this.props = {
      price: 'Стоимость',
      count: 'Количество',
      product_id: 'Продукт',
      to_customer: 'Покупатель:',
    };
    this.types = {
      price: 'number',
      count: 'number',
      product_id: 'number',
      team_id: 'field',
    };
    this.ruleValidate = {
      price: 'number',
      count: 'number',
      product_id: 'field',
      to_customer: 'field',
    };
    this.data = {
      price: '',
      count: '',
      product_id: '',
      to_customer: '',
    };
    this.hideShow = {product_id: true};
  }
}

export default new CreateProductSell();
