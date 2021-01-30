import Vue from 'vue';
import './config/bootstrap';
import App from './components/App.vue';
import router from './config/router';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
