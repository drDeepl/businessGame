export default class ModelUserCreate {
  constructor() {
    this.props = {
      username: 'Имя пользователя',
      first_name: 'Имя',
      last_name: 'Фамилия',
      email: 'Электронная почта',
      role: 'Роль пользователя',
      password: 'Пароль',
      team_id: 'Команда',
    };
    this.types = {
      username: 'string',
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      role: 'string',
      password: 'string',
      team_id: 'number',
    };
    this.ruleValidate = {
      username: 'field',
      first_name: 'field',
      last_name: 'field',
      email: 'email',
      role: 'field',
      password: 'field',
      team_id: 'number',
    };
    this.data = {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      role: '',
      password: '',
      team_id: 0,
    };
  }
}
