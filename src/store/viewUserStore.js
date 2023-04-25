import { defineStore } from 'pinia';

export const viewUserStore = defineStore('viewUserStore', {
  state: () => ({
    user_id: '',
    user_username: '',
    users_username: [],
    users: [],
    user: {
      id: '',
      username: '',
      email: '',
      infos: {
        created_at: '',
        role: '',
        description: '',
        avatar: '',
      },
      languages: {
        name: '',
        id: '',
        icon: '',
      }
    }
  }),
  getters: {
    getId: (state) => {
      return state.user_id;
    },
    getUsername: (state) => {
      return state.user_username;
    },
    getUsers: (state) => {
      return state.users;
    },
    getUsersUsername: (state) => {
      return state.users_username
    },
    getUser: (state) => {
      return state.user;
    }
  },
  persist: true,
});
