export default class ModelProductStore {
  constructor() {
    this.props = {
      product: 'продукт',
      count: 'количество',
    };
    this.types = {
      product: 'object',
      count: 'number',
    };
    this.data = {
      product: null,
      count: 0,
    };
  }
}
