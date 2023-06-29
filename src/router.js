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
          path: '/transaction',
          name: 'transaction',
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
