import instance from '@/api/main';

class userAPI {
  baseTab = 'users';
  getUsers() {
    return instance.get(this.baseTab);
  }

  getUserData(userId) {
    console.log('get data ');
    return instance.get(this.baseTab + '/' + userId);
  }

  updateUser(user_id, data) {
    return instance.put(this.baseTab + '/' + user_id, data);
  }
}

export default new userAPI();
