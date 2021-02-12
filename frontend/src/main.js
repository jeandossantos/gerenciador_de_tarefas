import Vue from 'vue';
import './config/bootstrap';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/solid';
import 'vue-datetime/dist/vue-datetime.css';

import './config/toast';
import store from './config/store';
import { Datetime } from 'vue-datetime';

import App from './components/App.vue';
import router from './config/router';

import axios from 'axios';

Vue.config.productionTip = false;
Vue.use(Datetime);

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.headers.Authorization = " bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IkplYW4gZG9zIFNhbnRvcyIsImluaXRpYWlzIjoiSlMiLCJlbWFpbCI6ImplYW5kZGdAaG90bWFpbC5jb20iLCJhZG1pbiI6ZmFsc2V9.h3x-kTks5RapPxrAhiiqJcTYDwB_jMdkEj08-UjfTc0";

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
