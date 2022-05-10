import TokenAPI from '@/api/token.api';
import TokenService from '@/services/token.service';

class AuthService {
  async login(user) {
    const response = await TokenAPI.pair(user);
    if (response.data.access) {
      TokenService.setUser(response.data);
    }
    return response.data;
  }

  logout() {
    TokenService.removeUser();
  }
}

export default new AuthService();
