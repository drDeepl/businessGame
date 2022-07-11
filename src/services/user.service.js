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
    console.warn('USER.SERVICE: getUserDataById');
    const response = await userAPI.getUserById(userId);
    const userData = new User(response.data);
    return userData;
  }

  async getUserDataByUsername(username) {
    console.log('USER.SERVICE: response to backend');
    const response = await userAPI.getUserByUsername(username);
    if (response.status == 200) {
      const userModel = new User();
      const userData = createModelFromResponseData(userModel, response.data);
      return userData;
    } else {
      throw new Error(
        'USER.SERVICE: getUserDataByUsername. Response Status: ' +
          response.status
      );
    }
  }

  async getRoles() {
    console.warn('USER.SERVICE: getRoles');
    const response = await userAPI.getRoles();
    if (response.status == 200) {
      return response.data;
    } else {
      throw new Error('TEST ERROR');
    }
  }

  async updateDataUser(user_id, data) {
    console.warn('USER.SERVICE: updateDataUser');
    console.log(user_id);
    console.log(data);
    const updatedData = await userAPI.updateUser(user_id, data);
    return updatedData;
  }
  async createUser(user) {
    console.warn('USER.SERVICE: createUser');
    const response = await userAPI.createUser(user);
    return response.data;
  }
}

export default new UserService();
