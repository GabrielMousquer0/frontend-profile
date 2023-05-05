import { defineStore } from 'pinia';

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    user: {},
  }),
  getters: {
    getUser: (state) => {
      return state.user;
    }
  },
  persist: true,
});
