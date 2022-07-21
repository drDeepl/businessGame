import instance from '@/api/main';
import TokenService from '@/services/token.service';
import {authHeader} from '@/helpers/helper.api';
const setup = (store) => {
  instance.interceptors.request.use(
    (config) => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        console.error('CONFIG\n', config);
        let headers = authHeader();
        headers['Authorization'] = 'Bearer ' + token; // for Spring Boot back-end
        // config.headers["x-access-token"] = token; // for Node.js Express back-end
        config.headers = headers;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      console.warn('ERROR\n', err);
      const originalConfig = err.config;
      console.warn('ORIGINAL CONFIG\n', originalConfig);
      if (err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const rs = await instance.post('/token/refresh', {
              refresh: TokenService.getLocalRefreshToken(),
            });

            const access = rs.data.access;
            console.warn('ACCESS', rs.data);

            store.dispatch('auth/refresh', access);
            TokenService.updateLocalAccessToken(access);
            console.warn(originalConfig);
            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};

export default setup;
