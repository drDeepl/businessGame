import {createModelFromResponseData} from '@/helpers/helper.model';
export default class Account {
  constructor(data) {
    this.props = ['id', 'is_unlimited', 'balance'];
    createModelFromResponseData(this, data);
  }
}
