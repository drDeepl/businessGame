import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Login,
    },
    {
      path: '/',
      component: () => import('@/layouts/MainLayout.vue'),
      children: [
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/views/Profile.vue'),
        },
        {
          path: '/admin',
          name: 'admin',
          component: () => import('@/views/Admin.vue'),
        },
        {
          path: '/manufacturer',
          name: 'manufacturer',
          component: () => import('@/views/Manufacturer.vue'),
          children: [
            {
              path: '/products',
              name: 'products',
              component: () => import('@/views/Admin.vue'),
            },
          ],
        },
        {
          path: '/player',
          name: 'player',
          component: () => import('@/views/Player.vue'),
        },
        {
          path: '/customer',
          name: 'customer',
          component: () => import('@/views/Customer.vue'),
        },
        {
          path: '/shop',
          name: 'shop',
          component: () => import('@/views/Shop.vue'),
        },
        {
          path: '/storage',
          name: 'storage',
          component: () => import('@/views/Storage.vue'),
        },
        {
          path: '/error',
          name: 'error',
          component: () => import('@/views/Error.vue'),
        },
        {
          path: '/:pathMathc(.*)*',
          name: 'NotFound',
          component: () => import('@/views/NotFound.vue'),
        },
      ],
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login', '/register', '/home'];
//   const authRequired = !publicPages.includes(to.path);
//   const loggedIn = localStorage.getItem('user');

//   // trying to access a restricted page + not logged in
//   // redirect to login page
//   if (authRequired && !loggedIn) {
//     next('/login');
//   } else {
//     next();
//   }
// });
