export default class ModelCreateTeam {
  constructor() {
    this.props = {
      name: 'Название команды',
      balance: 'Стартовый баланс команды'
    };
    this.typesProps = {
      name: 'string',
      balance: 'integer'
    };
    this.ruleValidate = {
      name: 'field',
      balance: 'integer'
    };
  }
}
