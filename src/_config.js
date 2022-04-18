export const links = [
  {title: 'Склад', url: '/storage', icon: 'warehouse'},
  {title: 'Магазин', url: '/shop', icon: 'shopping-cart'},
  {title: 'Пользовательская информация', url: '/users', icon: 'user'},
  {title: '', url: '/profile', icon: ''}
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
  username: null,

};

export const teamInfo = {
  id: null,
  name: null ,
  account : null
}

export const usersTableHeader = {
  'id': 'id',
  'username': 'Имя пользователя',
  'role': 'Роль',
  'team': 'Идентификатор команды',
  'account': 'Идентификатор счёта',
  'email': 'Емайл',
  'is_superuser': 'Администратор',
  'data_joined': 'Дата создания аккаунта',
  'last_login': 'Последняя авторизация',
  'first_name': 'Имя',
  'last_name': 'Фамилия',
  
}

export const accountsTableHeader = {
  'id': 'id',
  'balance': 'Баланс',
  'is_unlimited': 'Безлимитный',
}

export const transactionsTableHeader = {
  'from_account': 'Отправитель',
  'to_account': 'Получатель',
  'amount': 'Сумма',
  'timestamp': 'Дата',
}

export const cardsShowList = [
  {title: 'Список пользователей', body: 'users', tableHeaders: ''},
  {title: 'Список счетов', body: 'accounts', tableHeaders: ''},
  {title: 'Список транзакций', body: 'transactions', tableHeaders: ''},
]
