export class UserInfo {
  constructor(data = {}) {
    this.id = data.id;
    this.last_login = data.last_login;
    this.username = data.username;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.email = data.email;
    this.date_joined = data.date_joined;
    this.role = data.role;
    this.teamId = data.team;
    this.account = data.account;
    this.is_superuser = data.is_superuser;
  }
}
