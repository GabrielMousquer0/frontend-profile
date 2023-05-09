import { defineStore } from 'pinia';

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    user: {},
    mode: false,
  }),
  getters: {
    getUser: (state) => {
      return state.user;
    },
    getMode: (state) => {
      return state.mode;
    }
  },
  actions: {
    tradeMode(value) {
      return this.$state.mode = value;
    },
  },
  persist: true,
});
