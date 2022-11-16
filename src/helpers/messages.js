export default class Message {
  constructor() {
    this.errorTitle = 'Упс... что-то пошло не так';
    this.reloadPage = 'Попробуйте перезагрузить страницу';
    this.teamHaveNotProduct =
      'У вашей команды недостаточно продуктов для продажи';
    this.deleteUserTitle = 'Вы точно хотите удалить пользователя';
    this.deleteAllUsersTitle = 'Удалить всех пользователей?';
    this.deleteTeam = 'Очистить список команд?';
    this.deleteTeamDescription =
      'После удаления команд будут так же удалены все игроки, находящиеся в них';
  }
}
