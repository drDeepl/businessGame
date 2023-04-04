class CreateProductSell {
  constructor() {
    this.props = {
      price: 'Стоимость',
      count: 'Количество',
      product_id: 'Продукт',
      customer_id: 'Покупатель:',
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
      customer_id: 'field',
    };
    this.data = {
      price: '',
      count: '',
      product_id: '',
      customer_id: '',
    };
    this.hideShow = {product_id: true};
  }
}

export default new CreateProductSell();
