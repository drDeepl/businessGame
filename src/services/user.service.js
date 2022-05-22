import userAPI from '@/api/user.api';
import jwt_decode from 'jwt-decode';
import {userInfo} from '@/_config';
import {ValidateResponse} from '@/helpers/helper.decorator';
import UserInfo from '@/models/model.user';
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

  async getUserInfo(userId) {
    try {
      if (this.haveCash()) {
        console.log('USER.SERVICE: response to cash');
        const userData = this.getDataCash();
        return userData;
      } else {
        console.log('USER.SERVICE: response to backend');
        const responseUserData = await userAPI
          .getUserData(userId)
          .catch(err => err.response);
        if (responseUserData.status == 200) {
          const userInfo = new UserInfo(responseUserData.data);
          // TODO: Сделать проверку ответа
          ValidateResponse(userInfo, responseUserData.data);
          this.setDataCash(responseUserData.data);
          return responseUserData.data;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  async updateDataUser(user_id, dataJSON) {
    // Need data For update
    // {
    //   role: role,
    //   first_name: first_name,
    //   last_name: last_name,
    //   team_id: team_id
    // };
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
