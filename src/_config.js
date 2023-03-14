// NOTE: определяет API_URL в api/main/js
export const develop = true;
// NOTE:========================================
// INFO: sidebar links
export const adminSidebarLinks = [
  {
    title: 'Панель администратора',
    url: '/admin',
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
  {title: 'Мой профиль', url: '/player'},
  {title: 'Склад', url: '/storage'},
];

export const manufacturerSidebarLinks = [
  {title: 'Склад', url: '/manufacturer'},
  // {title: 'Магазин', url: '/shop'},
];

export const customerSidebarLinks = [
  // {title: 'Склад', url: '/storage'},
];

export const app = {
  title: 'Деловая игра',
};

export const colors = {
  purple: '#6b4ee6',
};
