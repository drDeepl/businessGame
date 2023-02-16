import instance from '@/api/main';
const subdomain = 'token';
class TokenAPI {
  verify(token) {
    return instance.post(subdomain + '/verify', {token: token});
  }

  refresh(refresh) {
    return instance.post(subdomain + '/refresh', refresh);
  }
}

export default new TokenAPI();
