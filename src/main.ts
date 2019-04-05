import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';
import './registerServiceWorker';

declare const window: any;

Vue.config.productionTip = false;
console.log({env: process.env});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
