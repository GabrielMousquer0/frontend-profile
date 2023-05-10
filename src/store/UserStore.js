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
    setUser(value) {
      this.$state.user = value;
    },
    setUserOptions(value) {
      this.$state.user.options = value;
    },
    setUserDescription(value) {
      this.$state.user.infos.description = value;
    },
  },
  persist: true,
});
