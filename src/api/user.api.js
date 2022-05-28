import instance from '@/api/main';

class userAPI {
  subdomain = 'users/';
  getUsers() {
    return instance.get(this.subdomain);
  }

  getUserById(userId) {
    console.log('get data ');
    return instance.get(this.subdomain + userId);
  }
  getUserByUsername(username) {
    return instance.get(this.subdomain + 'name/' + username);
  }
  updateUser(user_id, data) {
    return instance.put(this.subdomain + user_id, data);
  }
  deleteUser(userId) {
    return instance.delete(this.subdomain + userId);
  }
  getRoles() {
    return instance.get('/roles');
  }
}

export default new userAPI();
