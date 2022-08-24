// NOTE: определяет API_URL в api/main/js
export const develop = true;
// NOTE:========================================
// INFO: sidebar links
export const adminSidebarLinks = [
  {
    title: 'Панель администратора',
    url: '/admin',
    titleTabs: [
      {title: 'Создание пользователя', form: 'formCreateUser'},
      {title: 'создать команду', form: 'formCreateTeam'},
    ],
  },
];
// INFO: Styles for component
export const card = {
  color: '#6c63ff',
};
export const playerSidebarLinks = [
  {title: 'Склад', url: '/storage'},
  {title: 'Магазин', url: '/shop'},
  {title: 'Обо мне', url: '/profile'},
];

export const manufacturerSidebarLinks = [
  {title: 'Склад', url: '/manufacturer'},
  {title: 'Магазин', url: '/shop'},
];

export const customerSidebarLinks = [
  {title: 'Магазин', url: '/shop'},
  // {title: 'Склад', url: '/storage'},
];

export const rowUpdateUser = {
  first_name: 'Имя',
  last_name: 'Фамилия',
  team_name: 'Название команды',
};

export const selectUpdateUser = [
  {
    id: 'role',
    title: 'Роль',
    options: {
      manufacturer: 'Поставщик',
      player: 'Игрок',
      customer: 'Клиент',
    },
  },
];

export const app = {
  title: 'Деловая игра',
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
  last_name: 'Фамилия',
};

export const accountsTableHeader = {
  id: 'id',
  balance: 'Баланс',
  is_unlimited: 'Безлимитный',
};

export const transactionsTableHeader = {
  from_account: 'Отправитель',
  to_account: 'Получатель',
  amount: 'Сумма',
  timestamp: 'Дата',
};

export const teamsTableHeader = {
  id: 'id',
  name: 'Название',
  account: 'Счёт',
};

export const adminTabs = [
  {title: 'Пользователи', url: 'users'},
  {title: 'Команды', url: 'teams'},
  {title: 'Счета', url: 'accounts'},
  {
    title: 'Транзакции',
    url: 'transactions',
  },
];

export const colors = {
  purple: '#6b4ee6',
};
