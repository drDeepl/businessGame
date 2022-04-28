export const isAdmin = function(role) {
  if (role.toLowerCase() === 'admin') {
    return true;
  } else {
    return false;
  }
};
