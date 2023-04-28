import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from '../helpers/routes';

const history = createWebHashHistory();

const router = createRouter({
  history,
  routes,
});

export { router };
