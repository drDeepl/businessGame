export default class ModelTeam {
  constructor() {
    this.props = ['id', 'name', 'account'];
    this.titleProps = {
      id: 'Идентификатор команды',
      name: 'Название команды',
      account: 'Счёт команды',
    };
    this.types = {
      id: 'number',
      name: 'string',
      account: 'string',
    };
    this.ruleValidate = {
      id: 'number',
      name: 'field',
      account: 'field',
    };
  }
}
