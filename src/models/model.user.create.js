export default class ModelUserCreate {
  constructor() {
    this.props = {
      username: 'Имя пользователя',
      first_name: 'Имя',
      last_name: 'Фамилия',
      email: 'Электронная почта',
      role: 'Роль пользователя',
      password: 'Пароль',
      team_id: 'Команда'
    };
    this.typesProps = {
      username: 'string',
      first_name: 'string',
      last_name: 'string',
      email: 'string',
      role: 'string',
      password: 'string',
      team_id: 'integer'
    };
  }
}
