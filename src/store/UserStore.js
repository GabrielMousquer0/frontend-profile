import { defineStore } from 'pinia';

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    user: {},
  }),
  actions: {
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
  getters: {
    getUser: (state) => {
      return state.user;
    }
  },
  persist: true,
});
