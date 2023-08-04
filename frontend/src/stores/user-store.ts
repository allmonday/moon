import { defineStore } from 'pinia';
import { UserRead, UserService } from 'src/client';
import { TOKEN_NAME } from 'src/utils/auth';
import * as jose from 'jose';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as UserRead,
  }),
  getters: {
    rawToken() {
      return localStorage.getItem(TOKEN_NAME)
    },
    token() {
      const token = localStorage.getItem(TOKEN_NAME)
      const claims = jose.decodeJwt(token as string);
      return claims
    }
  },
  actions: {
    async readUser() {
      this.user = await UserService.usersCurrentUser();
    },
  },
});
