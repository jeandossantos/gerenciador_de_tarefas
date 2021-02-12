import Vue from 'vue';
import VueMyToasts from 'vue-my-toasts';
import 'vue-my-toasts/dist/vue-my-toasts.css';
 import BootstrapComponent from "vue-my-toasts/src/components/toasts/BootstrapComponent";

Vue.use(VueMyToasts, {
  component: BootstrapComponent,
  options: {
    width: '400px',
    position: 'bottom-right',
    padding: '1rem'
  }
});
