import api from "./api";
import TokenService from "./token.service";

class AuthService {
  login(user) {
    return api
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
