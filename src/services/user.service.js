import userAPI from '@/api/user.api';
import jwt_decode from 'jwt-decode';
import {userInfo} from '@/_config';
import {checkObjNullUndef} from '@/helpers/data.helper';

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

  async updateDataUser(user_id, role, first_name, last_name, team_id) {
    let data = {
      role: role,
      first_name: first_name,
      last_name: last_name,
      team_id: team_id
    };
    console.log(user_id);
    console.log(checkObjNullUndef(data));

    // TODO: функцию изменение данных пользователя админом
    // const updatedData = await userAPI.updateUser(user_id, data);
    // this.setDataCash(updatedData);
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
