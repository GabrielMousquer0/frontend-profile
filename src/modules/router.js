import { createRouter, createWebHashHistory } from 'vue-router';
import ProfileUser from '../views/user/ProfileUser.vue';
import Login from '../views/login/InputsLogin.vue';
import RegisterUser from '../views/login/RegisterUser.vue';
import UsersList from '../views/user/ListUser.vue';
import UserProfile from '../views/user/ViewProfile.vue';
import SearchUser from '../views/user/SearchUser.vue';
import ConfigsUser from '../views/user/ConfigsUser.vue';

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
    name: 'User',
    components: {
      default: ProfileUser,
    },
    props: true,
  },
  {
    path: '/register',
    name: 'Register',
    components: {
      default: RegisterUser,
    },
  },
  {
    path: '/list',
    name: 'List',
    components: {
      default: UsersList,
    },
  },
  {
    path: '/view/:id',
    name: 'View',
    components: {
      default: UserProfile,
    },
    props: true,
  },
  {
    path: '/search/:username',
    name: 'Search',
    components: {
      default: SearchUser,
    },
    props: true,
  },
  {
    path: '/configs/:id',
    name: 'Configs',
    components: {
      default: ConfigsUser,
    },
    props: true,
  },
];

const history = createWebHashHistory();

const router = createRouter({
  history,
  routes,
});

export { router };
