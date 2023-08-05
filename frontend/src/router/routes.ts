import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'login',
    children: [
      {
        path: 'auth-callback',
        name: 'auth',
        component: () => import('pages/callback/AuthPage.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/login/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/dashbaord',
    redirect: 'user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'user',
        path: 'user',
        component: () => import('pages/default/UserPage.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
