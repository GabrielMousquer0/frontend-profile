import { defineStore } from 'pinia';

export const viewUserStore = defineStore('viewUserStore', {
  state: () => ({
    view_user_id: '',
    search_user_username: '',
  }),
  getters: {
    getId: (state) => {
      return state.view_user_id;
    },
    getUsername: (state) => {
      return state.search_user_username;
    },
  },
  persist: true,
});
