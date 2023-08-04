import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { verifyToken } from 'src/utils/auth'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: 'https://api.example.com' });

axios.interceptors.request.use(function (config) {
  if (config.url?.startsWith('/api/auth')) {  // bypass auth
    return config
  }
  // Do something before request is sent
  const result = verifyToken()
  console.log(`api interceptor token verify result: ${result}`)
  if( result !== 'verified') {
    location.assign('/login')
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
