export default class ModelUser {
  constructor() {
    this.props = [
      'id',
      'last_login',
      'username',
      'role',
      'team',
      'account',
      'first_name',
      'last_name',
      'email',
      'date_joined',
      'is_superuser',
    ];
    this.titleProps = {
      id: 'id',
      last_login: 'Был онлайн',
      username: 'Имя пользователя',
      role: 'Роль',
      team: 'Команда',
      account: 'Счет',
      first_name: 'Имя',
      last_name: 'Фамилия',
      email: 'Электронная почта',
      date_joined: 'Дата регистрации',

      is_superuser: 'Администратор',
    };
    this.types = {
      id: 'number',
      last_login: 'string',
      username: 'string',
      role: 'string',
      team: 'number',
      account: 'number',
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      date_joined: 'string',
      is_superuser: 'boolean',
    };
    this.hideShow = {
      last_login: true,
      date_joined: true,
      is_superuser: true,
      id: true,
      email: true,
      first_name: true,
      last_name: true,
    };
  }
}
