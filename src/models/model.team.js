export default class Team {
  constructor() {
    this.props = ['id', 'name', 'account'];
    this.titleProps = {
      id: 'Идентификатор команды',
      name: 'Название команды',
      account: 'Счёт команды'
    };
    this.types = {
      id: 'integer',
      name: 'string',
      account: 'string'
    };
  }
}
