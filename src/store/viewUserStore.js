import { defineStore } from 'pinia';

export const viewUserStore = defineStore('viewUserStore', {
  state: () => ({
    user_id: '',
    user_username: '',
    users_username: [],
  }),
  getters: {
    getId: (state) => {
      return state.user_id;
    },
    getUsername: (state) => {
      return state.user_username;
    },
    getUsersUsername: (state) => {
      return state.users_username;
    },
  },
  persist: true,
});
