import { defineStore } from 'pinia';

export const routerStore = defineStore('routerStore', {
  state: () => ({
    router_name: '',
  }),
  getters: {
    getName: (state) => {
      return state.router_name;
    },
  },
  persist: true,
});
