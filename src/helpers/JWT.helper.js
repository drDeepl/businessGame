import jwt_decode from 'jwt-decode';

const parseJWT = function(jwt) {
  return jwt_decode(jwt);
};

export default parseJWT;
