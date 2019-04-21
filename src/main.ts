import Vue from 'vue';
import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';

import App from './App.vue';
import router from './router';
import { store } from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(Ionic);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
