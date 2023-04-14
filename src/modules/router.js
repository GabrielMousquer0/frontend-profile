import { createRouter, createWebHashHistory } from 'vue-router';
import ProfileUser from '../views/user/ProfileUser.vue';
import Login from '../views/login/InputsLogin.vue';
import RegisterUser from '../views/login/RegisterUser.vue';
import UsersList from '../views/user/ListUser.vue';
import UserProfile from '../views/user/ViewProfile.vue';
import SearchUser from '../views/user/SearchUser.vue';

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
    props: true,
  },
  {
    path: '/search/:username',
    name: 'searchUser',
    components: {
      default: SearchUser,
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
