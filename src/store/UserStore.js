import { defineStore } from 'pinia';

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    user: {
      email: '',
      id: '',
      username: '',
      infos: {
        avatar: '',
        created_at: '',
        description: '',
        role: '',
      },
      languages: [{
        name: '',
        id: '',
      }]
    },
  }),
  getters: {
    getUser: (state) => {
      return state.user;
    }
  },
  persist: true,
});
