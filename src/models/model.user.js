import {createModelFromResponseData} from '@/helpers/helper.model';

export default class User {
  constructor(data) {
    this.props = [
      'id',
      'last_login',
      'username',
      'first_name',
      'last_name',
      'email',
      'date_joined',
      'role',
      'team',
      'account',
      'is_superuser'
    ];
    createModelFromResponseData(this, data);
  }
}
