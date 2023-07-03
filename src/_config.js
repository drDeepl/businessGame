// NOTE: определяет API_URL в api/main/js
export const develop = true;
// NOTE:========================================
// INFO: sidebar links
export const domain = develop ? 'localhost:8000' : '94.228.112.177';

export const adminSidebarLinks = [
  {
    title: 'Панель администратора',
    url: 'admin',
    titleTabs: [
      {title: 'Создать пользователя', form: 'formCreateUser'},
      {title: 'Создать команду', form: 'formCreateTeam'},
    ],
  },
];
// INFO: Styles for component
export const card = {
  color: '#6c63ff',
};
export const playerSidebarLinks = [
  {title: 'Предложения', url: 'player'},
  {title: 'Склад', url: 'storage'},
  {title: 'Общая история покупок', url: 'transaction'},
];

export const manufacturerSidebarLinks = [
  {title: 'Склад', url: 'manufacturer'},
  {title: 'Общая история покупок', url: 'transaction'},
];

export const customerSidebarLinks = [
  {title: 'Предложения', url: 'customer'},
  {title: 'Общая история покупок', url: 'transaction'},
];

export const app = {
  title: 'Деловая игра',
};

export const colors = {
  purple: '#6b4ee6',
};
