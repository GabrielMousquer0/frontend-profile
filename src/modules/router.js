import { createRouter, createWebHashHistory } from 'vue-router';
import ProfileUser from '../views/user/ProfileUser.vue';
import Login from '../views/login/InputsLogin.vue';
import RegisterUser from '../views/login/RegisterUser.vue';
import UsersList from '../views/user/ListUser.vue';
import UserProfile from '../views/user/ViewProfile.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    components: {
      default: Login,
    },
  },
  {
    path: '/user/:id',
    name: 'ProfileUser',
    components: {
      default: ProfileUser,
    },
    props: true,
  },
  {
    path: '/register',
    components: {
      default: RegisterUser,
    },
  },
  {
    path: '/list',
    components: {
      default: UsersList,
    },
  },
  {
    path: '/view/:id',
    name: 'viewUser',
    components: {
      default: UserProfile,
    },
  },
];

const history = createWebHashHistory();

const router = createRouter({
  history,
  routes,
});

export { router };
