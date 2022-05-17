import TokenAPI from '@/api/token.api';
import TokenService from '@/services/token.service';
import validatePropertyResponse from '@/helpers/api.helper';
import ModelObtainToken from '@/models/model.token';
class AuthService {
  async login(user) {
    console.log('AuthServce: login');
    const response = await TokenAPI.pair(user);
    const obtainToken = new ModelObtainToken(response.data);
    validatePropertyResponse(obtainToken);
    TokenService.setUser(response.data);
    return response;
  }

  logout() {
    TokenService.removeUser();
  }
}

export default new AuthService();
