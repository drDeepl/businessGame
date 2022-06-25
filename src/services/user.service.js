import userAPI from '@/api/user.api';
import jwt_decode from 'jwt-decode';
import {userInfo} from '@/_config';
import User from '@/models/model.user';
import {createModelFromResponseData} from '@/helpers/helper.model';

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
    const response = await userAPI.getUsers();
    if (response.status == 200) {
      return response.data;
    } else {
      throw new Error('Get Users List Status code' + response.status);
    }
  }

  getUserId(access) {
    const userId = jwt_decode(access).user_id;
    return userId;
  }

  async getUserDataById(userId) {
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
  }

  async getUserDataByUsername(username) {
    if (this.haveCash()) {
      console.log('USER.SERVICE: response to cash');
      const userData = this.getDataCash();
      return userData;
    } else {
      console.log('USER.SERVICE: response to backend');
      const response = await userAPI.getUserByUsername(username);
      if (response.status == 200) {
        const userModel = new User();
        const userData = createModelFromResponseData(userModel, response.data);
        // this.setDataCash(userData);
        return userData;
      } else {
        throw new Error(
          'USER.SERVICE: getUserDataByUsername. Response Status: ' +
            response.status
        );
      }
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
