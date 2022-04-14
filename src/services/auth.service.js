import instance from '@/api/main'
import TokenService from "@/services/token.service"

class AuthService {
  login(user) {
    return instance
      .post("/token/pair", {
        password: user.password,
        username: user.username
      })
      .then((response) => {
        if (response.data.access) {
          TokenService.setUser(response.data);
        }

        return response.data;
      });
  }

  logout() {
    TokenService.removeUser();
  }
}

export default new AuthService();
