export default class ModelUpdateUser {
  constructor() {
    this.props = {
      first_name: 'Имя',
      last_name: 'Фамилия',
      role: 'Роль',
      team_id: 'Команда'
    };
    this.typesProps = {
      first_name: 'string',
      last_name: 'string',
      role: 'string',
      team_id: 'integer'
    };
  }
}
