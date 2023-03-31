import { defineStore } from 'pinia';

export const useUserStore = defineStore('useUserStore', {
  state: () => ({
    user_id: '',
    user_username: '',
    user_email: '',
    user_role: '',
    user_password: '',
    user_avatar: '',
  }),
  getters: {
    getId: (state) => {
      return state.user_id;
    },
    getUsername: (state) => {
      return state.user_username;
    },
    getEmail: (state) => {
      return state.user_email;
    },
    getRole: (state) => {
      return state.user_role;
    },
    getPassword: (state) => {
      return state.user_password;
    },
    getAvatar: (state) => {
      return state.user_avatar;
    },
  },
  persist: true,
});
