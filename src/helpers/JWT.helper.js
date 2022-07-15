import jwt_decode from 'jwt-decode';

export const parseJWT = function (jwt) {
  return jwt_decode(jwt);
};

export const createAuthHeader = function (jwt) {
  const config = {
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  };
  return config;
};
