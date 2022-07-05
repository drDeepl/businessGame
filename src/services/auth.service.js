import TokenAPI from '@/api/token.api';
import TokenService from '@/services/token.service';
import {createModelFromResponseData} from '@/helpers/helper.model';
import ModelObtainToken from '@/models/model.token';
class AuthService {
  async login(formData) {
    console.warn('Auth.Service: login');
    console.log(formData);
    const response = await TokenAPI.pair(formData);
    const data = response.data;
    const obtainToken = new ModelObtainToken();
    console.log('Obtain.Token');
    createModelFromResponseData(obtainToken, data);
    TokenService.setUser(obtainToken);
    return response;
  }

  logout() {
    TokenService.removeUser();
  }
}

export default new AuthService();
