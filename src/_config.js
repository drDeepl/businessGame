// NOTE: определяет API_URL в api/main/js
export const develop = true;
// NOTE:========================================
// INFO: sidebar links

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
  {title: 'Мой профиль', url: 'profile'},
  {title: 'Склад', url: 'storage'},
];

export const manufacturerSidebarLinks = [
  {title: 'Мой профиль', url: 'profile'},
  {title: 'Склад', url: 'manufacturer'},
  // {title: 'Магазин', url: '/shop'},
];

export const customerSidebarLinks = [
  {title: 'Мой профиль', url: 'profile'},
  {title: 'Предложения', url: 'customer'},
];

export const app = {
  title: 'Деловая игра',
};

export const colors = {
  purple: '#6b4ee6',
};
