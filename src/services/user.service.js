import userAPI from '@/api/user.api';
import jwt_decode from 'jwt-decode';
import {userInfo} from '@/_config';
import User from '@/models/model.user';
// import {checkObjNullUndef} from '@/helpers/data.helper';

class UserService {
  cashDataUser = userInfo;
  isAdmin(role) {
    if (role.toLowerCase() === 'admin') {
      return true;
    } else {
      return false;
    }
  }

  haveCash() {
    console.log('USER.SERVICE.haveCash:');
    for (let property in this.cashDataUser) {
      if (this.cashDataUser[property] == null) {
        return false;
      }
    }
    return true;
  }

  getDataCash() {
    console.log('USER.SERVICE.getDataCash: ');
    return this.cashDataUser;
  }

  async getUsersList() {
    const users = await userAPI.getUsers();
    return users.data;
  }

  getUserId(access) {
    const userId = jwt_decode(access).user_id;
    return userId;
  }

  async getUserDataById(userId) {
    try {
      if (this.haveCash()) {
        console.log('USER.SERVICE: response to cash');
        const userData = this.getDataCash();
        return userData;
      } else {
        console.log('USER.SERVICE: response to backend');
        const response = await userAPI.getUserById(userId);
        const userData = new User(response.data);
        this.setDataCash(userData);
        return userData;
      }
    } catch (e) {
      console.log('ERROR.USER.SERVICE: getUserInfoById\n', e);
    }
  }

  async getUserDataByUsername(username) {
    if (this.haveCash()) {
      console.log('USER.SERVICE: response to cash');
      const userData = this.getDataCash();
      return userData;
    } else {
      console.log('USER.SERVICE: response to backend');
      const response = await userAPI.getUserByUsername(username);
      // TODO: Добавить проверку на успешный ответ
      console.log('USER.SERVICE:getUserDataByUsername');
      console.log(response);
      const userData = new User(response.data);
      this.setDataCash(userData);
      return userData;
    }
  }

  async updateDataUser(user_id, dataJSON) {
    console.log('UPDATE USER');
    console.log(user_id);
    console.log(dataJSON);
    const updatedData = await userAPI.updateUser(user_id, dataJSON);
    this.setDataCash(updatedData);
    return updatedData;
  }

  setDataCash(userData) {
    console.log('USER.SERVICE: setDataCash');
    console.log(userInfo);
    for (let property in this.cashDataUser) {
      this.cashDataUser[property] = userData[property];
    }
    console.log('USER.SERVICE: setDataCash complete');
    console.log(this.cashDataUser);
  }
}

export default new UserService();
