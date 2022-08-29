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
];

export const manufacturerSidebarLinks = [
  {title: 'Склад', url: '/manufacturer'},
  {title: 'Магазин', url: '/shop'},
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
