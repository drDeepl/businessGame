import instance from '@/api/main';
const subdomain = 'token';
class TokenAPI {
  verify(token) {
    return instance.post(subdomain + '/verify', {token: token});
  }

  pair(user) {
    return instance.post(subdomain + '/pair', user);
  }

  refresh(refresh) {
    return instance.post(subdomain + '/refresh', refresh);
  }
}

export default new TokenAPI();
