import instance from '@/api/main';

class TokenAPI {
  subdomain = 'token';
  verify(token) {
    return instance.post(this.subdomain + '/verify', {token: token});
  }

  pair(user) {
    const reqBody = {
      password: user.password,
      username: user.username
    };
    return instance.post(this.subdomain + '/pair', reqBody);
  }
}

export default new TokenAPI();
