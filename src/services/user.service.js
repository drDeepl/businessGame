import userAPI from '@/api/user.api';
import jwt_decode from 'jwt-decode';
import {userInfo} from '@/_config';

class userService {
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
    // TODO: Почему функция возвращает промис???
    try {
      if (this.haveCash()) {
        console.log('USER.SERVICE: response to cash');
        const userData = this.getDataCash();
        return userData;
      } else {
        console.log('USER.SERVICE: response to backend');
        const userData = await userAPI.getUserData(userId);
        this.setDataCash(userData.data);
        return userData.data;
      }
    } catch (e) {
      console.log(e);
    }
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

export default new userService();
