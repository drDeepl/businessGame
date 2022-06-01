<<<<<<< HEAD
import {createModelFromResponseData} from '@/helpers/helper.model';

export default class User {
=======
export class UserInfo {
>>>>>>> 4ae8519 (exit)
  properties = [
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
  // TODO: Сделать проверку data внутри конструктора
  constructor(data) {
    {
      const lengthDataProps = Object.keys(data).length;
      if (this.properties.length === lengthDataProps) {
        for (let i in this.properties) {
          const property = this.properties[i];
          User.prototype[property] = data[property];
        }
      } else {
        throw new 'MODEL.USER: length data props not equal length properties'();
      }
    }
  }
}
