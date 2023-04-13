import { defineStore } from 'pinia';

export const viewUserStore = defineStore('viewUserStore', {
  state: () => ({
    view_user_id: '',
  }),
  getters: {
    getId: (state) => {
      return state.view_user_id;
    },
  },
  persist: true,
});
