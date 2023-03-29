import { createRouter, createWebHashHistory } from 'vue-router';
const User = {
  template: '<div>User {{ $route.params.id }}</div>',
};

const routes = [
  {
    path: '/user/:id',
    name: 'userProfile',
    component: User,
  },
];

const history = createWebHashHistory();

const router = createRouter({
  history,
  routes,
});

export { router };
