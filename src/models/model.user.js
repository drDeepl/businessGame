export default class User {
  constructor() {
    this.props = [
      'id',
      'last_login',
      'username',
      'first_name',
      'last_name',
      'email',
      'date_joined',
      'role',
      'team',
      'account',
      'is_superuser'
    ];
    this.titleProps = {
      id: 'id',
      last_login: 'Был онлайн',
      username: 'Имя пользователя',
      first_name: 'Имя',
      last_name: 'Фамилия',
      email: 'Электронная почта',
      date_joined: 'Дата регистрации',
      role: 'Роль',
      team: 'Команда',
      account: 'Счет',
      is_superuser: 'Администратор'
    };
  }
}
