// import TokenAPI from '@/api/token.api';
import TokenService from '@/services/token.service';
import {createModelFromResponseData} from '@/helpers/helper.model';
import ModelObtainToken from '@/models/model.token';

import Token from '@/store/models/Token';

class AuthService {
  async login(formData) {
    console.warn('Auth.Service: login');
    console.log(formData);

    const response = await Token.api().pair(formData);

    const data = response.response.data;
    console.error(data);
    const obtainToken = new ModelObtainToken();
    console.log('Obtain.Token');
    createModelFromResponseData(obtainToken, data);
    TokenService.setUser(obtainToken);
    return response.response;
  }

  logout() {
    TokenService.removeUser();
  }
}

export default new AuthService();
