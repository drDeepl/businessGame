// INFO: sidebar links
export const adminSidebarLinks = [
  {
    title: 'Панель администратора',
    url: '/admin',
    titleCards: [
      {id: 1, value: 'Создание пользователя', form: 'formCreateUser'},
      {id: 2, value: 'создать команду', form: 'createTeam'},
      {id: 3, value: 'создать счет команды', form: 'createAccountTeam'},
      {id: 4, value: 'список пользователей'}
    ]
  }
];
// INFO: Styles for component
export const card = {
  color: '#6c63ff'
};
export const playerSidebarLinks = [
  {title: 'Склад', url: '/storage'},
  {title: 'Предложения', url: '/shop'},
  {title: 'Обо мне', url: '/profile'}
];

export const manufacturerSidebarLinks = [
  {title: 'Добавить продукт', url: '/storage'},
  {title: 'Продать продукт', url: '/shop'}
];

export const customerSidebarLinks = [
  {title: 'Купить продуктовый набор', url: '/storage'}
];

export const rowUpdateUser = {
  first_name: 'Имя',
  last_name: 'Фамилия',
  team_name: 'Название команды'
};

export const selectUpdateUser = [
  {
    id: 'role',
    title: 'Роль',
    options: {
      manufacturer: 'Поставщик',
      player: 'Игрок',
      customer: 'Клиент'
    }
  }
];

export const app = {
  title: 'Деловая игра'
};

export const usersTableHeader = {
  id: 'id',
  username: 'Имя пользователя',
  role: 'Роль',
  team: 'Идентификатор команды',
  account: 'Идентификатор счёта',
  email: 'Емайл',
  is_superuser: 'Администратор',
  data_joined: 'Дата создания аккаунта',
  last_login: 'Последняя авторизация',
  first_name: 'Имя',
  last_name: 'Фамилия'
};

export const accountsTableHeader = {
  id: 'id',
  balance: 'Баланс',
  is_unlimited: 'Безлимитный'
};

export const transactionsTableHeader = {
  from_account: 'Отправитель',
  to_account: 'Получатель',
  amount: 'Сумма',
  timestamp: 'Дата'
};

export const teamsTableHeader = {
  id: 'id',
  name: 'Название',
  account: 'Счёт'
};

export const adminTabs = [
  {title: 'Пользователи', url: 'users'},
  {title: 'Команды', url: 'teams'},
  {title: 'Счета', url: 'accounts'},
  {
    title: 'Транзакции',
    url: 'transactions'
  }
];

export const colors = {
  purple: '#6b4ee6'
};
