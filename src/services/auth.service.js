import TokenAPI from '@/api/token.api';
import TokenService from '@/services/token.service';
import validatePropertyResponse from '@/helpers/api.helper';
import ModelObtainToken from '@/models/model.token';
class AuthService {
  async login(formData) {
    console.warn('Auth.Service: login');
    console.log(formData);
    const response = await TokenAPI.pair(formData);
    const obtainToken = new ModelObtainToken(response.data);
    console.log('Obtain.Token');
    console.log(obtainToken);
    validatePropertyResponse(obtainToken);
    TokenService.setUser(obtainToken);
    return response;
  }

  logout() {
    TokenService.removeUser();
  }
}

export default new AuthService();
