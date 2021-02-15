import Vue from 'vue';
import './config/bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/solid';
import 'vue-datetime/dist/vue-datetime.css';

import axios from 'axios';
import './config/toast';
import store from './config/store';
import { Datetime } from 'vue-datetime';

import App from './components/App.vue';
import router from './config/router';

axios.defaults.baseURL = "http://localhost:3001";


Vue.config.productionTip = false;
Vue.use(Datetime);


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
