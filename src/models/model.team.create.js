export default class ModelCreateTeam {
  constructor() {
    this.props = {
      name: 'Название команды',
      balance: 'Стартовый баланс команды'
    };
    this.types = {
      name: 'string',
      balance: 'integer'
    };
  }
}
