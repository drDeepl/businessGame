import {createModelFromResponseData} from '@/helpers/helper.model';

export default class Account {
  properties = ['id', 'is_unlimited', 'balance'];
  constructor(data) {
    createModelFromResponseData(this, data);
  }
}
