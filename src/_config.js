export const links = [
  {title: 'Склад', url: '/storage', icon: 'warehouse'},
  {title: 'Магазин', url: '/shop', icon: 'shopping-cart'},
  {title: 'Обо мне', url: '/profile', icon: 'address-card'}
];

export const adminSidebar = [
  {
    title: 'Панель администратора',
    url: '/admin',
    icon: 'chart-line'
  },
  {title: 'Информация о пользователях\n УДАЛИТЬ', url: '/users', icon: 'user'}
];

export const adminLinks = [
  {title: 'Управление пользователями', url: '/users', icon: 'users'},
  {title: 'Управление командами', url: '/users', icon: 'users'},
  {title: 'Управление счетами', url: '/users', icon: 'users'}
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

export const userInfo = {
  account: null,
  date_joined: null,
  email: null,
  first_name: null,
  id: null,
  is_superuser: null,
  last_name: null,
  role: null,
  team: null,
  username: null
};

export const teamInfo = {
  id: null,
  name: null,
  account: null
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

export const cardsShowList = [
  {title: 'Список пользователей', body: 'users', tableHeaders: ''},
  {title: 'Список счетов', body: 'accounts', tableHeaders: ''},
  {title: 'Список транзакций', body: 'transactions', tableHeaders: ''}
];
