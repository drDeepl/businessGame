export default class ModelUpdateUser {
  constructor() {
    this.props = {
      first_name: 'Имя',
      last_name: 'Фамилия',
      role: 'Роль',
      team_id: 'Команда',
    };
    this.ruleValidate = {
      first_name: 'field',
      last_name: 'field',
      role: 'field',
      team_id: 'number',
    };
    this.types = {
      first_name: 'string',
      last_name: 'string',
      role: 'string',
      team_id: 'number',
    };
    this.data = {
      first_name: '',
      last_name: '',
      role: '',
      team_id: '',
    };
  }
}
