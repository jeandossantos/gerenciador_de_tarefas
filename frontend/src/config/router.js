import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../components/home/Home';
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        component: Home,
        name: 'Home'
    }
]

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router;